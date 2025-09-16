import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import crypto from 'crypto';

const LEMONSQUEEZY_WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

// Variant to tokens mapping (server only)
const tokensByVariant: Record<string, number> = {
  "VARIANT_ID_STARTER": 20,
  "VARIANT_ID_PRO": 100,
  "VARIANT_ID_BUSINESS": 300,
};

// Verify webhook signature
function verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(rawBody);
    const digest = hmac.digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';
    
    // Verify webhook signature
    if (!verifyWebhookSignature(rawBody, signature, LEMONSQUEEZY_WEBHOOK_SECRET)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const event = JSON.parse(rawBody);
    const eventName = event.meta?.event_name;
    const eventId = event.meta?.event_id;
    const order = event.data;

    console.log('Lemonsqueezy webhook received:', {
      eventName,
      eventId,
      orderId: order?.id,
    });

    // Only process order_created events with paid status
    if (eventName !== 'order_created' || order?.attributes?.status !== 'paid') {
      return NextResponse.json({ ok: true });
    }

    // Extract order details
    const custom = order?.attributes?.custom || {};
    const userId = custom.user_id;
    const variantId = custom.variant_id;
    const tokens = tokensByVariant[variantId] || 0;

    if (!userId || !tokens) {
      console.error('Missing required data:', { userId, variantId, tokens });
      return NextResponse.json({ ok: true });
    }

    // Process the purchase atomically
    const supabase = await getServerSupabase();
    const { error } = await supabase.rpc('purchase_credit_tokens', {
      p_event_id: eventId,
      p_user_id: userId,
      p_tokens: tokens,
      p_order_id: order.id,
      p_status: order.attributes.status,
      p_raw: event,
    });

    if (error) {
      console.error('Failed to process purchase:', error);
      return NextResponse.json(
        { error: 'Failed to process purchase' },
        { status: 500 }
      );
    }

    console.log('Purchase processed successfully:', {
      eventId,
      userId,
      tokens,
      orderId: order.id,
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

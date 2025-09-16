import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY!;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;

// Variant to tokens mapping (server only)
const tokensByVariant: Record<string, number> = {
  "VARIANT_ID_STARTER": 20,
  "VARIANT_ID_PRO": 100,
  "VARIANT_ID_BUSINESS": 300,
};

export async function POST(req: NextRequest) {
  try {
    const { variantId } = await req.json();
    
    // Validate variant ID
    if (!tokensByVariant[variantId]) {
      return NextResponse.json(
        { error: 'Invalid variant ID' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await getServerSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    
    // Create Lemonsqueezy checkout payload
    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: { 
            email: user.email 
          },
          checkout_options: {
            success_url: `${origin}/checkout/success`,
            cancel_url: `${origin}/checkout/cancel`,
          },
          product_options: { 
            redirect: true 
          },
          custom: { 
            user_id: user.id, 
            variant_id: variantId 
          },
        },
        relationships: { 
          store: { 
            data: { 
              type: "stores", 
              id: LEMONSQUEEZY_STORE_ID 
            } 
          }, 
          variant: { 
            data: { 
              type: "variants", 
              id: variantId 
            } 
          } 
        },
      },
    };

    // Call Lemonsqueezy API
    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LEMONSQUEEZY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Lemonsqueezy API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create checkout' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const checkoutUrl = data.data?.attributes?.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'No checkout URL returned' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: checkoutUrl });

  } catch (error) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

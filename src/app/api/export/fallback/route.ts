import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { options, cardState } = await request.json();
    
    console.log('SSR Fallback Export Request:', { options, cardState });
    
    // 간단한 fallback 구현
    // 실제로는 puppeteer-core + @sparticuz/chromium을 사용해야 하지만
    // 현재는 기본적인 에러 응답으로 처리
    
    if (!cardState || !options) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // 임시로 에러 응답 (실제 구현에서는 서버에서 렌더링)
    return NextResponse.json(
      { 
        error: 'SSR fallback not fully implemented yet',
        message: 'Please try again or contact support if the issue persists'
      },
      { status: 501 }
    );
    
  } catch (error) {
    console.error('SSR Export Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process export request'
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { options, cardState } = await request.json();
    
    // 대용량/고해상도 처리나 클라이언트 실패 시 SSR fallback
    // 현재는 간단한 에러 응답으로 구현
    // 실제 구현에서는 puppeteer-core + @sparticuz/chromium 사용
    
    console.log('SSR Fallback Export Request:', { options, cardState });
    
    // 임시로 에러 응답 (실제 구현에서는 서버에서 렌더링)
    return NextResponse.json(
      { error: 'SSR fallback not implemented yet' },
      { status: 501 }
    );
    
  } catch (error) {
    console.error('SSR Export Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

'use client';

export default function EnvCheckPage() {
  const envStatus = {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL || 'undefined',
    anonValue: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(-4) : 'undefined',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">환경변수 진단 페이지</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">환경변수 상태</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-32">URL:</span>
              <span className={`px-2 py-1 rounded ${envStatus.hasUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {envStatus.hasUrl ? '✅ 설정됨' : '❌ 누락'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-32">Anon Key:</span>
              <span className={`px-2 py-1 rounded ${envStatus.hasAnon ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {envStatus.hasAnon ? '✅ 설정됨' : '❌ 누락'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">상세 정보</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(envStatus, null, 2)}
          </pre>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">해결 방법</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 둘 다 true여야 정상 작동</li>
            <li>• 하나라도 false면 Vercel 환경변수 설정 필요</li>
            <li>• 설정 후 "Clear cache and rebuild"로 재배포</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

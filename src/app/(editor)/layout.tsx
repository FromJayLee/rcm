import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getServerSupabase } from '@/lib/supabase/server';

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  
  const cookieStore = await cookies();
  const isGuest = cookieStore.get('guest')?.value === 'true';

  if (!user && !isGuest) {
    redirect('/auth/login?next=/app/editor');
  }

  return <>{children}</>;
}

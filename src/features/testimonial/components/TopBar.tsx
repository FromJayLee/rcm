'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Coins, User, Settings, LogOut } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useTokenBalance } from '@/hooks/useTokenBalance';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

export function TopBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { tokenBalance } = useTokenBalance();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user as User);
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user as User);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <header className="h-16 border-b border-charcoal/20 bg-ivory px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-ivory font-bold text-sm">TC</span>
          </div>
          <span className="font-semibold text-lg text-charcoal">Testimonial Creator</span>
        </div>
        <div className="animate-pulse bg-charcoal/10 h-8 w-8 rounded-full"></div>
      </header>
    );
  }

  return (
    <header className="h-16 border-b border-charcoal/20 bg-ivory px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-ivory font-bold text-sm">TC</span>
        </div>
        <span className="font-semibold text-lg text-charcoal">Testimonial Creator</span>
      </div>

      {/* Right side - Token balance and user menu */}
      <div className="flex items-center space-x-4">
        {/* Token Balance */}
        <Badge variant="secondary" className="flex items-center space-x-1 bg-charcoal/10 text-charcoal border-charcoal/20">
          <Coins className="w-3 h-3" />
          <span>{tokenBalance} Tokens</span>
        </Badge>

        {/* User Profile Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-charcoal/10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt="User" />
                  <AvatarFallback className="bg-charcoal/10 text-charcoal">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-ivory border-charcoal/20" align="end" forceMount>
              <DropdownMenuLabel className="font-normal text-charcoal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-charcoal/60">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-charcoal/20" />
              <DropdownMenuItem className="text-charcoal hover:bg-charcoal/10" onClick={() => router.push('/dashboard')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-charcoal hover:bg-charcoal/10" onClick={() => router.push('/checkout')}>
                <Coins className="mr-2 h-4 w-4" />
                <span>토큰 구입</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-charcoal/20" />
              <DropdownMenuItem className="text-charcoal hover:bg-charcoal/10" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

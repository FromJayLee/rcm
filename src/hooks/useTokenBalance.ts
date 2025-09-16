'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useTokenBalance() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: tokenBalance, isLoading, error } = useQuery({
    queryKey: ['tokenBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const supabase = getBrowserSupabase();
      const { data, error } = await supabase
        .from('profiles')
        .select('token_balance')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching token balance:', error);
        return 0;
      }

      return data?.token_balance || 0;
    },
    enabled: !!user,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });

  const refetchTokenBalance = () => {
    queryClient.invalidateQueries({ queryKey: ['tokenBalance', user?.id] });
  };

  return {
    tokenBalance: tokenBalance || 0,
    isLoading,
    error,
    refetchTokenBalance,
  };
}

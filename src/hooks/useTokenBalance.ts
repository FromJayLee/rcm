'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useTokenBalance() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: tokenBalance, isLoading, error } = useQuery({
    queryKey: ['tokenBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const supabase = createSupabaseBrowserClient();
      
      // First, try to get existing profile
      const { data, error } = await supabase
        .from('profiles')
        .select('token_balance')
        .eq('id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile for user:', user.id);
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          token_balance: 25 // Default free tokens for new users
        })
            .select('token_balance')
            .single();

          if (createError) {
            console.error('Error creating profile:', {
              message: createError.message,
              details: createError.details,
              hint: createError.hint,
              code: createError.code
            });
            return 0;
          }

          return newProfile?.token_balance || 25;
        }

        console.error('Error fetching token balance:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
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

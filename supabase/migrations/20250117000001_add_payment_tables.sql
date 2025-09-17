-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  token_balance integer NOT NULL DEFAULT 3,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add token_balance column to profiles table (if it already exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'token_balance'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN token_balance integer NOT NULL DEFAULT 3;
  END IF;
END $$;

-- Create purchases table
CREATE TABLE IF NOT EXISTS public.purchases (
  id bigserial PRIMARY KEY,
  event_id text UNIQUE NOT NULL,
  ls_order_id text UNIQUE NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  variant_id text,
  tokens integer NOT NULL,
  amount_cents integer,
  currency text,
  status text NOT NULL,
  raw jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_event_id ON public.purchases(event_id);
CREATE INDEX IF NOT EXISTS idx_purchases_ls_order_id ON public.purchases(ls_order_id);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON public.purchases(created_at);

-- Create function for atomic credit token purchase
CREATE OR REPLACE FUNCTION public.purchase_credit_tokens(
  p_event_id text,
  p_user_id uuid,
  p_tokens int,
  p_order_id text,
  p_status text,
  p_raw jsonb
)
RETURNS void 
LANGUAGE plpgsql 
AS $$
BEGIN
  -- Check if this event has already been processed (idempotency)
  PERFORM 1 FROM public.purchases WHERE event_id = p_event_id;
  IF FOUND THEN 
    RETURN; 
  END IF;
  
  -- Insert purchase record
  INSERT INTO public.purchases(
    event_id, 
    ls_order_id, 
    user_id, 
    variant_id, 
    tokens, 
    status, 
    raw
  )
  VALUES (
    p_event_id, 
    p_order_id, 
    p_user_id, 
    NULL, 
    p_tokens, 
    p_status, 
    p_raw
  );
  
  -- Update user's token balance
  UPDATE public.profiles 
  SET token_balance = token_balance + p_tokens 
  WHERE id = p_user_id;
END; 
$$;

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  
  -- Create new policies
  CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

  CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

  CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);
END $$;

-- Enable RLS on purchases table
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for purchases table
CREATE POLICY "Users can view their own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert purchases" ON public.purchases
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update purchases" ON public.purchases
  FOR UPDATE USING (true);

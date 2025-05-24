-- Fix the trigger function to use classroom_owner as default instead of general
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, user_type)
  VALUES (NEW.id, NEW.email, 'classroom_owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
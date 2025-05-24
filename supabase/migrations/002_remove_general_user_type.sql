-- Remove general user type constraint and update to only allow classroom_owner and admin
ALTER TABLE profiles 
DROP CONSTRAINT profiles_user_type_check;

ALTER TABLE profiles 
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('classroom_owner', 'admin'));

-- Update any remaining general users to classroom_owner (should be none after cleanup)
UPDATE profiles 
SET user_type = 'classroom_owner' 
WHERE user_type = 'general'; 
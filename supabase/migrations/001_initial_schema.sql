-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('general', 'classroom_owner', 'admin')),
  email VARCHAR(255),
  full_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classrooms table
CREATE TABLE classrooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  address TEXT,
  prefecture VARCHAR(20),
  city VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(255),
  website_url VARCHAR(500),
  target_ages TEXT[], -- 配列で複数年齢層対応
  available_days TEXT[], -- 曜日配列
  available_times TEXT,
  instructor_info TEXT,
  pr_points TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'suspended')),
  is_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classroom_photos table
CREATE TABLE classroom_photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
  photo_url VARCHAR(500) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  target_audience VARCHAR(100),
  price_range VARCHAR(100),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(100) UNIQUE,
  stripe_customer_id VARCHAR(100),
  status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
  sender_name VARCHAR(100) NOT NULL,
  sender_email VARCHAR(255) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Classrooms policies
CREATE POLICY "Anyone can view published classrooms" ON classrooms
  FOR SELECT USING (status = 'published');

CREATE POLICY "Owners can view own classrooms" ON classrooms
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert own classrooms" ON classrooms
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own classrooms" ON classrooms
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own classrooms" ON classrooms
  FOR DELETE USING (auth.uid() = owner_id);

-- Classroom photos policies
CREATE POLICY "Anyone can view photos of published classrooms" ON classroom_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classrooms 
      WHERE classrooms.id = classroom_photos.classroom_id 
      AND classrooms.status = 'published'
    )
  );

CREATE POLICY "Owners can manage own classroom photos" ON classroom_photos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM classrooms 
      WHERE classrooms.id = classroom_photos.classroom_id 
      AND classrooms.owner_id = auth.uid()
    )
  );

-- Courses policies
CREATE POLICY "Anyone can view courses of published classrooms" ON courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classrooms 
      WHERE classrooms.id = courses.classroom_id 
      AND classrooms.status = 'published'
    )
  );

CREATE POLICY "Owners can manage own classroom courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM classrooms 
      WHERE classrooms.id = courses.classroom_id 
      AND classrooms.owner_id = auth.uid()
    )
  );

-- Subscriptions policies
CREATE POLICY "Owners can view own subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classrooms 
      WHERE classrooms.id = subscriptions.classroom_id 
      AND classrooms.owner_id = auth.uid()
    )
  );

CREATE POLICY "Owners can manage own subscriptions" ON subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM classrooms 
      WHERE classrooms.id = subscriptions.classroom_id 
      AND classrooms.owner_id = auth.uid()
    )
  );

-- Inquiries policies
CREATE POLICY "Anyone can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Classroom owners can view inquiries for their classrooms" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classrooms 
      WHERE classrooms.id = inquiries.classroom_id 
      AND classrooms.owner_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_classrooms_status ON classrooms(status);
CREATE INDEX idx_classrooms_prefecture ON classrooms(prefecture);
CREATE INDEX idx_classrooms_city ON classrooms(city);
CREATE INDEX idx_classrooms_owner_id ON classrooms(owner_id);
CREATE INDEX idx_classroom_photos_classroom_id ON classroom_photos(classroom_id);
CREATE INDEX idx_courses_classroom_id ON courses(classroom_id);
CREATE INDEX idx_subscriptions_classroom_id ON subscriptions(classroom_id);
CREATE INDEX idx_inquiries_classroom_id ON inquiries(classroom_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, user_type)
  VALUES (NEW.id, NEW.email, 'general');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classrooms_updated_at
  BEFORE UPDATE ON classrooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column(); 
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_type: 'general' | 'classroom_owner' | 'admin'
          email: string | null
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_type: 'general' | 'classroom_owner' | 'admin'
          email?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_type?: 'general' | 'classroom_owner' | 'admin'
          email?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      classrooms: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string | null
          address: string | null
          prefecture: string | null
          city: string | null
          phone: string | null
          email: string | null
          website_url: string | null
          target_ages: string[] | null
          available_days: string[] | null
          available_times: string | null
          instructor_info: string | null
          pr_points: string | null
          status: 'draft' | 'pending' | 'published' | 'suspended'
          is_paid: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description?: string | null
          address?: string | null
          prefecture?: string | null
          city?: string | null
          phone?: string | null
          email?: string | null
          website_url?: string | null
          target_ages?: string[] | null
          available_days?: string[] | null
          available_times?: string | null
          instructor_info?: string | null
          pr_points?: string | null
          status?: 'draft' | 'pending' | 'published' | 'suspended'
          is_paid?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string | null
          address?: string | null
          prefecture?: string | null
          city?: string | null
          phone?: string | null
          email?: string | null
          website_url?: string | null
          target_ages?: string[] | null
          available_days?: string[] | null
          available_times?: string | null
          instructor_info?: string | null
          pr_points?: string | null
          status?: 'draft' | 'pending' | 'published' | 'suspended'
          is_paid?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      classroom_photos: {
        Row: {
          id: string
          classroom_id: string
          photo_url: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          classroom_id: string
          photo_url: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          classroom_id?: string
          photo_url?: string
          display_order?: number
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          classroom_id: string
          name: string
          target_audience: string | null
          price_range: string | null
          description: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          classroom_id: string
          name: string
          target_audience?: string | null
          price_range?: string | null
          description?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          classroom_id?: string
          name?: string
          target_audience?: string | null
          price_range?: string | null
          description?: string | null
          display_order?: number
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          classroom_id: string
          stripe_subscription_id: string | null
          stripe_customer_id: string | null
          status: 'active' | 'inactive' | 'cancelled' | 'past_due'
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          classroom_id: string
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status: 'active' | 'inactive' | 'cancelled' | 'past_due'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          classroom_id?: string
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status?: 'active' | 'inactive' | 'cancelled' | 'past_due'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          classroom_id: string
          sender_name: string
          sender_email: string
          subject: string | null
          message: string
          status: 'unread' | 'read' | 'replied'
          created_at: string
        }
        Insert: {
          id?: string
          classroom_id: string
          sender_name: string
          sender_email: string
          subject?: string | null
          message: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
        Update: {
          id?: string
          classroom_id?: string
          sender_name?: string
          sender_email?: string
          subject?: string | null
          message?: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
      }
    }
  }
} 
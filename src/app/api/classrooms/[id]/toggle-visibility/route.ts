import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { updateClassroomVisibility } from '@/lib/payment'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authorization header から Bearer token を取得
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status } = await request.json()

    if (!['published', 'draft'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // 教室の所有者確認
    const { data: classroom, error: classroomError } = await supabaseAdmin
      .from('classrooms')
      .select('owner_id')
      .eq('id', params.id)
      .single()

    if (classroomError || !classroom) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 })
    }

    if (classroom.owner_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 決済状況チェックと状態更新
    const result = await updateClassroomVisibility(params.id, status)

    if (!result.success) {
      return NextResponse.json({ 
        error: result.message 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.message 
    })

  } catch (error) {
    console.error('Toggle visibility error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
} 
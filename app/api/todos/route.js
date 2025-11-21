import { NextResponse } from 'next/server';
import { getTodos, createTodo } from '@/lib/db';

// GET /api/todos - List todos with pagination
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const status = searchParams.get('status') || '';
    
    // Build filter
    const filter = status ? { status } : {};
    
    // Fetch todos from MongoDB
    let todos = await getTodos(filter);
    
    // Pagination
    const total = todos.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTodos = todos.slice(startIndex, endIndex);
    
    const response = {
      data: paginatedTodos,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('GET /api/todos error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.title || body.title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    const newTodo = await createTodo({
      title: body.title.trim(),
      description: body.description?.trim() || '',
      status: 'Pending',
    });
    
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('POST /api/todos error:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getTodoById, updateTodo, deleteTodo } from '@/lib/db';

// GET /api/todos/[id]
export async function GET(request, context) {
  try {
    const params = await context.params;
    const todo = await getTodoById(params.id);
    
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error('GET /api/todos/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PUT /api/todos/[id]
export async function PUT(request, context) {
  try {
    const params = await context.params;
    const body = await request.json();
    
    // Validation
    if (body.title !== undefined && body.title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title cannot be empty' },
        { status: 400 }
      );
    }
    
    if (body.status && !['Pending', 'In-Progress', 'Completed'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    const updatedTodo = await updateTodo(params.id, body);
    
    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error('PUT /api/todos/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id]
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const success = await deleteTodo(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Todo deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/todos/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}

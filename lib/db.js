import connectDB from './mongodb';
import Todo from './models/Todo';

// Get all todos with optional filtering
export const getTodos = async (filter = {}) => {
  try {
    await connectDB();
    const todos = await Todo.find(filter).sort({ createdAt: -1 }).lean();
    
    // Convert MongoDB _id to id and format dates
    return todos.map(todo => ({
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description || '',
      status: todo.status,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Get a single todo by ID
export const getTodoById = async (id) => {
  try {
    await connectDB();
    const todo = await Todo.findById(id).lean();
    
    if (!todo) return null;
    
    return {
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description || '',
      status: todo.status,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching todo:', error);
    return null;
  }
};

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    await connectDB();
    const todo = await Todo.create(todoData);
    
    return {
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description || '',
      status: todo.status,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, updates) => {
  try {
    await connectDB();
    const todo = await Todo.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).lean();
    
    if (!todo) return null;
    
    return {
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description || '',
      status: todo.status,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error updating todo:', error);
    return null;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    await connectDB();
    const result = await Todo.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    console.error('Error deleting todo:', error);
    return false;
  }
};

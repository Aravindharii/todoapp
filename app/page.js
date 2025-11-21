'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, Filter } from 'lucide-react';
import TodoCard from '@/components/TodoCard';
import TodoForm from '@/components/TodoForm';
import Pagination from '@/components/Pagination';
import LoadingSkeleton from '@/components/LoadingSkeleton';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  
  const fetchTodos = async (page = 1, status = '') => {
    setIsFetching(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        ...(status && { status }),
      });
      
      const response = await fetch(`/api/todos?${params}`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      
      const data = await response.json();
      setTodos(data.data);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (error) {
      toast.error('Failed to fetch todos');
    } finally {
      setIsFetching(false);
    }
  };
  
  useEffect(() => {
    fetchTodos(currentPage, statusFilter);
  }, [currentPage, statusFilter]);
  
  const handleCreateTodo = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to create todo');
      
      toast.success('Todo created successfully!');
      setIsModalOpen(false);
      fetchTodos(1, statusFilter);
      setCurrentPage(1);
    } catch (error) {
      toast.error('Failed to create todo');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateTodo = async (data) => {
    if (!editingTodo) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/todos/${editingTodo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to update todo');
      
      toast.success('Todo updated successfully!');
      setIsModalOpen(false);
      setEditingTodo(null);
      fetchTodos(currentPage, statusFilter);
    } catch (error) {
      toast.error('Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete todo');
      
      toast.success('Todo deleted successfully!');
      
      if (todos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchTodos(currentPage, statusFilter);
      }
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };
  
  const openCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };
  
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Todo Manager
          </h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create New Todo
          </button>
          
          <div className="flex items-center gap-2 flex-1">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="flex-1 sm:flex-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="text-gray-600 flex items-center justify-center sm:justify-start">
            <span className="font-medium">{total} total todos</span>
          </div>
        </div>
        
        {isFetching ? (
          <LoadingSkeleton />
        ) : todos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No todos found</h3>
            <p className="text-gray-500 mb-6">
              {statusFilter ? 'Try changing the filter' : 'Create your first todo to get started'}
            </p>
            {!statusFilter && (
              <button
                onClick={openCreateModal}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Create Todo
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onEdit={openEditModal}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
      
      <TodoForm
        todo={editingTodo}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
        isLoading={isLoading}
      />
    </div>
  );
}

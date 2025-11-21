import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TodoForm({ todo, isOpen, onClose, onSubmit, isLoading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setStatus(todo.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('Pending');
    }
  }, [todo, isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      ...(todo && { status }),
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-blue-200/70 via-purple-200/70 to-pink-200/70 p-[1px] shadow-2xl animate-slideUp">
        <div className="rounded-2xl bg-white/95 backdrop-blur p-6">
          <div className="sticky top-0 bg-white/95 -mx-6 px-6 py-4 border-b border-slate-100 flex justify-between items-center mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {todo ? 'Update your plan' : 'Let’s plan something new'}
              </p>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {todo ? 'Edit Todo' : 'Create New Todo'}
              </h2>
            </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
          </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-slate-600 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-transparent bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-blue-300 outline-none transition-all shadow-inner shadow-slate-200 placeholder:text-slate-400"
              placeholder="Enter todo title"
              required
              disabled={isLoading}
              maxLength={100}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-600 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-transparent bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-purple-300 outline-none transition-all resize-none shadow-inner shadow-slate-200 placeholder:text-slate-400"
              placeholder="Enter todo description (optional)"
              rows={4}
              disabled={isLoading}
              maxLength={500}
            />
          </div>
          
          {todo && (
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-slate-600 mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-transparent bg-slate-50/80 focus:bg-white focus:ring-4 focus:ring-indigo-300 outline-none transition-all shadow-inner shadow-slate-200"
                disabled={isLoading}
              >
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-200 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !title.trim()}
            >
              {isLoading ? 'Saving...' : todo ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

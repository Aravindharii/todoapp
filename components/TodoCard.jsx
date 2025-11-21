import { format } from 'date-fns';
import { Pencil, Trash2, Clock } from 'lucide-react';

const statusColors = {
  Pending: 'bg-amber-100 text-amber-900 ring-1 ring-amber-200/70',
  'In-Progress': 'bg-sky-100 text-sky-900 ring-1 ring-sky-200/70',
  Completed: 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/70',
};

export default function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-blue-200/60 via-purple-200/60 to-pink-200/60 p-[1px] shadow-lg shadow-blue-100/60 hover:shadow-xl transition-all duration-300">
      <div className="relative h-full rounded-2xl bg-white/90 backdrop-blur-sm p-5 flex flex-col">
        <div className="absolute inset-x-5 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-full opacity-60 group-hover:opacity-90 transition-opacity" />
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-slate-900 flex-1 pr-2 line-clamp-2">
            {todo.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm whitespace-nowrap ${
              statusColors[todo.status] ?? 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
            }`}
          >
            {todo.status}
          </span>
        </div>
        
        {todo.description && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {todo.description}
          </p>
        )}
        
        <div className="flex items-center text-xs text-slate-500 mb-5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 rounded-full flex items-center justify-center mr-3 shadow-inner">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Last updated</p>
            <span className="font-medium text-slate-600">{format(new Date(todo.updatedAt), 'MMM dd, yyyy')}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(todo)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-500 shadow-md shadow-rose-200 hover:shadow-lg hover:from-rose-400 hover:to-orange-400 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

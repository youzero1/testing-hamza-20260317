'use client';

import { Todo } from './TodoApp';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, updates: Partial<Todo>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl font-medium">No todos yet!</p>
        <p className="text-sm mt-1">Add your first todo above to get started.</p>
      </div>
    );
  }

  const active = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Active ({active.length})
          </h3>
          <div className="space-y-3">
            {active.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Completed ({completed.length})
          </h3>
          <div className="space-y-3">
            {completed.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import ListItem from './ListItem';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: inputValue },
      ]);
      setInputValue('');
    }
  };

  const handleEditTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='mx-auto max-w-md'>
      <h1 className='text-3xl font-bold text-center mb-8'>Todo List</h1>
      <div className='flex'>
        <input
          type='text'
          data-testid='todo-input'
          placeholder='Add todo...'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
          className='flex-1 rounded-l-lg border-t border-b border-l border-gray-300 px-4 py-2 focus:outline-none focus:shadow-outline'
        />
        <button
          onClick={handleAddTodo}
          className='bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline'
        >
          Add
        </button>
      </div>
      <ul className='mt-8'>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

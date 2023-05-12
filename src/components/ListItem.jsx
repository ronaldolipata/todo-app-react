import { useState } from 'react';

function ListItem({ todo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  const handleSaveEdit = () => {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  };

  const handleDeleteButtonClick = () => {
    onDelete(todo.id);
  };

  return (
    <li className='flex items-center justify-between border-b border-gray-300 py-4'>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit();
              }
            }}
            className='flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:shadow-outline'
          />
          <button
            onClick={handleSaveEdit}
            className='bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 focus:outline-none focus:shadow-outline ml-4'
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className='bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 focus:outline-none focus:shadow-outline ml-4'
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className='flex-1'>{todo.text}</span>
          <div className='flex'>
            <button
              data-testid='edit-button'
              onClick={handleEditButtonClick}
              className='bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline'
            >
              Edit
            </button>
            <button
              data-testid='delete-button'
              onClick={handleDeleteButtonClick}
              className='bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 focus:outline-none focus:shadow-outline ml-4'
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default ListItem;

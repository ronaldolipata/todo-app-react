import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('TodoApp', () => {
  test('Adding item to the list', () => {
    // Render the TodoApp component
    const { getByTestId, getByText } = render(<TodoApp />);

    // Find the input field and add a new item to the list
    const inputField = getByTestId('todo-input');
    fireEvent.change(inputField, { target: { value: 'Buy groceries' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 13, charCode: 13 });

    // Check if the new item is added to the list
    const newItem = getByText('Buy groceries');
    expect(newItem).toBeInTheDocument();
  });

  test('Editing item in the list', () => {
    // Render the TodoApp component
    const { getByTestId, getByText } = render(<TodoApp />);

    // Find the input field and add a new item to the list
    const inputField = getByTestId('todo-input');
    fireEvent.change(inputField, { target: { value: 'Buy groceries' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 13, charCode: 13 });

    // Find the edit button and edit the item
    const editButton = getByTestId('edit-button');
    fireEvent.click(editButton);

    // Simulate updating the item
    fireEvent.change(inputField, { target: { value: 'Buy milk' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 13, charCode: 13 });

    // Check if the item is edited in the list
    const editedItem = getByText('Buy milk');
    expect(editedItem).toBeInTheDocument();
  });

  test('Deleting item from the list', () => {
    // Render the TodoApp component
    const { getByTestId, getByText, queryByText } = render(<TodoApp />);

    // Find the input field and add a new item to the list
    const inputField = getByTestId('todo-input');
    fireEvent.change(inputField, { target: { value: 'Buy groceries' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 13, charCode: 13 });

    // Find the delete button and delete the item
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    // Check if the item is deleted from the list
    const deletedItem = queryByText('Buy groceries');
    expect(deletedItem).toBeNull();
  });
});

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title: title.trim(), dueDate: dueDate ? dueDate.toLocaleDateString('en-CA') : null });
      setTitle('');
      setDueDate(null);
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="add-input"
      />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Add due date"
      />
      <button type="submit" className="add-btn" disabled={!title.trim()}>
        Add
      </button>
    </form>
  );
}

export default AddTodo;

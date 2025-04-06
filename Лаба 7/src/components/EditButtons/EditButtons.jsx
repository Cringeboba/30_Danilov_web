import React from 'react';
import './EditButtons.css';

const EditButtons = ({ onDelete, onEdit }) => {
  return (
    <div className="edit-buttons">
      <button 
        className="edit-button" 
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        ✏️
      </button>
      <button 
        className="delete-button" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        🗑️
      </button>
    </div>
  );
};

export default EditButtons;
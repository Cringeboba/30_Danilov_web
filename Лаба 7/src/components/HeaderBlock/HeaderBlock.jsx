import React from 'react';
import './HeaderBlock.css';

const HeaderBlock = ({ name, avatar, editable, onNameChange }) => {
  return (
    <div className="header-block">
      <img src={avatar} alt={name} className="header-block-avatar" />
      <h1
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onBlur={(e) => onNameChange && onNameChange(e.target.textContent)}
      >
        {name}
      </h1>
    </div>
  );
};

export default HeaderBlock;
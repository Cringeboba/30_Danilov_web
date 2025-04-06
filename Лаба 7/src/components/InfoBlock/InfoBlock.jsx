import React from 'react';
import Block from '../Block/Block';
import './InfoBlock.css';

const InfoBlock = ({ description, editable, onDescriptionChange }) => {
  return (
    <Block>
      <p 
        contentEditable={editable}
        onBlur={(e) => onDescriptionChange(e.target.textContent)}
      >
        {description}
      </p>
    </Block>
  );
};

export default InfoBlock;
import React from 'react';
import Block from '../Block/Block';
import './LinkBlock.css';

const LinkBlock = ({ link, editable, onLinkChange }) => {
  return (
    <Block>
      <a 
        href={link}
        contentEditable={editable}
        onBlur={(e) => onLinkChange(e.target.textContent)}
      >
        {link}
      </a>
    </Block>
  );
};

export default LinkBlock;
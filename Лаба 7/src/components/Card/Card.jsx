import React from 'react';
import HeaderBlock from '../HeaderBlock/HeaderBlock';
import InfoBlock from '../InfoBlock/InfoBlock';
import LinkBlock from '../LinkBlock/LinkBlock';
import EditButtons from '../EditButtons/EditButtons';
import './Card.css';

const Card = ({ 
  data, 
  isEditMode, 
  onNameChange, 
  onDescriptionChange, 
  onLinkChange, 
  onAvatarChange,
  onEdit,
  onDelete
}) => {
  const { id, name, avatar, description, link } = data;

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onAvatarChange(id, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card">
      {isEditMode && (
        <>
          <EditButtons 
            onEdit={() => onEdit(id)}
            onDelete={() => onDelete(id)}
          />
          <div className="avatar-upload">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleAvatarUpload}
              id={`avatar-upload-${id}`}
              style={{ display: 'none' }}
            />
            <label 
              htmlFor={`avatar-upload-${id}`}
              className="avatar-upload-label"
            >
              Сменить аватар
            </label>
          </div>
        </>
      )}

      <HeaderBlock 
        name={name}
        avatar={avatar}
        editable={isEditMode}
        onNameChange={(newName) => onNameChange(id, newName)}
      />

      <InfoBlock 
        description={description}
        editable={isEditMode}
        onDescriptionChange={(newDesc) => onDescriptionChange(id, newDesc)}
      />

      <LinkBlock 
        link={link}
        editable={isEditMode}
        onLinkChange={(newLink) => onLinkChange(id, newLink)}
      />
    </div>
  );
};

export default Card;
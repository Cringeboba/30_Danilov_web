import React from 'react';
import './Header.css';

const Header = ({ isEditMode, onToggleEdit }) => {
  return (
    <header>
      <div className="header-content">
        <div className="header-buttons">
          <a href="../html/RAWG.html" className="nav-button">Поиск игр</a>
          <a href="../html/waifu.html" className="nav-button">Вайфу</a>
          <a href="../html/JSONPlaceholder.html" className="nav-button">Placeholder</a>
        </div>
        <h1 className="site-title">Топ мобов в R.E.P.O.</h1>
        <button 
          className="toggle-edit-mode"
          onClick={onToggleEdit}
        >
          {isEditMode ? "Завершить редактирование" : "Режим редактирования"}
        </button>
      </div>
    </header>
  );
};

export default Header;
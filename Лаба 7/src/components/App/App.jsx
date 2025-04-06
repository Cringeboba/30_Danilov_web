import React, { useState } from 'react';
import Header from '../Header/Header';
import Card from '../Card/Card';
import './App.css';

const App = () => {
  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      name: "Ублюдок №1 (Клоун)",
      avatar: "../src/images/Клоун.png",
      description: "Громко ходит из-за своих больших ног! Бьет лазером, который убивает с одного выстрела. Также берет перерыв после атаки лазером.",
      link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3438192859"
    },
    {
      id: 2,
      name: "Ублюдок №2 (Монашка)",
      avatar: "../src/images/Халат.png",
      description: "БЕЗШУМНО передвигается! Также, заметив игрока, начинает движение к нему уже чуть быстрее. Но если игрок посмотрит ему на маску(лицо), то начинает кричать и с очень большой скоростью двигаться к игроку!",
      link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3438192859"
    },
    {
      id: 3,
      name: "Ублюдок №3 (Утка)",
      avatar: "../src/images/Утка.png",
      description: "Эта утка следует за самым большим монстром, но когда заметит игрока обязательно будет следовать за игроком и пытаться попасть в его 'перекрестие' что бы обязательно ее потрогали, но стоит это сделать перевоплотится в утку с огромной пастью и начнет вас кусать. чаще всего убивает, но у нее есть КД. если вы быстры или имеете много ХП можно выжить.",
      link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3438192859"
    }
  ]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [siteTitle, setSiteTitle] = useState("Топ мобов в R.E.P.O.");

  const handleNameChange = (id, newName) => {
    setCardsData(cardsData.map(card => 
      card.id === id ? { ...card, name: newName } : card
    ));
  };

  const handleDescriptionChange = (id, newDesc) => {
    setCardsData(cardsData.map(card => 
      card.id === id ? { ...card, description: newDesc } : card
    ));
  };

  const handleLinkChange = (id, newLink) => {
    setCardsData(cardsData.map(card => 
      card.id === id ? { ...card, link: newLink } : card
    ));
  };

  const handleAvatarChange = (id, newAvatar) => {
    setCardsData(cardsData.map(card => 
      card.id === id ? { ...card, avatar: newAvatar } : card
    ));
  };

  const deleteCard = (id) => {
    setCardsData(cardsData.filter(card => card.id !== id));
    
  };

  const addNewCard = () => {
    const newId = Math.max(0, ...cardsData.map(card => card.id)) + 1;
    setCardsData([
      ...cardsData,
      {
        id: newId,
        name: "Новый персонаж",
        avatar: "../src/images/default.jpg",
        description: "Описание нового персонажа",
        link: "https://example.com"
      }
    ]);
  };

  const saveCardEdits = (id) => {
    console.log(`Карточка ${id} сохранена`);
  };

  return (
    <div className="app">
      <Header 
        isEditMode={isEditMode}
        siteTitle={siteTitle}
        onToggleEdit={() => setIsEditMode(!isEditMode)}
        onTitleChange={setSiteTitle}
      />
      
      <div className="cards-container">
        {cardsData.map(card => (
          <Card
            key={card.id}
            data={card}
            isEditMode={isEditMode}
            onNameChange={handleNameChange}
            onDescriptionChange={handleDescriptionChange}
            onLinkChange={handleLinkChange}
            onAvatarChange={handleAvatarChange}
            onEdit={saveCardEdits}
            onDelete={deleteCard}
          />
        ))}

        {isEditMode && (
          <div className="card add-card" onClick={addNewCard}>
            <button className="add-card-button">
              + Добавить карточку
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
import { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.jsx';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const handleMouseEnter = () => {
    document.querySelector('.profile__avatar').style.opacity = '0.3';
    document.querySelector('.profile__add-avatar').style.opacity = '1';
  };

  const handleMouseLeave = () => {
    document.querySelector('.profile__avatar').style.opacity = '1';
    document.querySelector('.profile__add-avatar').style.opacity = '0';
  };

  const currentUserInfo = React.useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then(res => {
        console.log(res);
        setCards(state => (state = res));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleCardDelete = card => {
    api.deleteCard(card._id).then(res => {
      setCards(state => state.filter(card => card._id !== res._id));
    });
  };

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            alt="Аватар
        пользователя"
            onClick={onEditAvatar}
            src={currentUserInfo.avatar}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div className="profile__add-avatar"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserInfo.name}</h1>
          <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
          <p className="profile__description">{currentUserInfo.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
      </section>
      <section className="photo">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

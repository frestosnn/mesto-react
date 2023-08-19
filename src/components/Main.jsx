import { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.jsx';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const handleMouseEnter = () => {
    document.querySelector('.profile__avatar').style.opacity = '0.3';
    document.querySelector('.profile__add-avatar').style.opacity = '1';
  };

  const handleMouseLeave = () => {
    document.querySelector('.profile__avatar').style.opacity = '1';
    document.querySelector('.profile__add-avatar').style.opacity = '0';
  };

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setUserName(state => (state = res.name));
        setUserDescription(state => (state = res.about));
        setUserAvatar(state => (state = res.avatar));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then(res => {
        setCards(state => (state = res));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            alt="Аватар
        пользователя"
            onClick={onEditAvatar}
            src={userAvatar}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div className="profile__add-avatar"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
      </section>
      <section className="photo">
        {cards.map(card => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;

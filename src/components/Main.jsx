import { useEffect, useState } from 'react';
import { api } from './utils/Api.js';
import Card from './Card.jsx';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then(res => {
      setUserName(state => (state = res.name));
      setUserDescription(state => (state = res.about));
      setUserAvatar(state => (state = res.avatar));
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then(res => {
      setCards(state => (state = res));
    });
  }, []);

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              alt="Аватар
        пользователя"
              onClick={onEditAvatar}
              src={userAvatar}
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

        <div className="popup popup_remove-card">
          <div className="popup__container">
            <button
              className="popup__button-close popup__button-close_popup_remove"
              type="button"
            ></button>
            <h2 className="popup__title popup__title_size_small">Вы уверены?</h2>
            <div className="popup__button-container">
              <button className="popup__button-save popup__button-save_popup_delete" type="button">
                Да
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;

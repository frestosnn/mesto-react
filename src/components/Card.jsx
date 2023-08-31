import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import React from 'react';

function Card({ card, onCardClick, onCardDelete }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDelete = () => {
    onCardDelete(card);
  };

  const currentUserInfo = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUserInfo._id;

  const isLiked = card.likes.some(c => c._id === currentUserInfo._id);

  return (
    <div className="photo__item">
      <img className="photo__image" src={card.link} onClick={handleCardClick} alt={card.name} />
      {isOwn && <button className="photo__delete" type="button" onClick={handleDelete} />}
      <div className="photo__text-area">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__wrapp">
          <button className={`photo__like ${isLiked ? 'photo__like_active' : ''}`}></button>
          <span className="photo__like-numbers">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

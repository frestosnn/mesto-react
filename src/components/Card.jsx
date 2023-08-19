function Card({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <div className="photo__item">
      <img className="photo__image" src={card.link} onClick={handleCardClick} alt={card.name} />
      <button className="photo__delete" type="button"></button>
      <div className="photo__text-area">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__wrapp">
          <button className="photo__like"></button>
          <span className="photo__like-numbers">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

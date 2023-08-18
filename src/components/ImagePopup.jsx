function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_add_big-photo ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_photo_full">
        <button
          className="popup__button-close popup__button-close_popup_zoom"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__img" src={card.link} />
        <h1 className="popup__photo-title">{card.name}</h1>
      </div>
    </div>
  );
}

export default ImagePopup;

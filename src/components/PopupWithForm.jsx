function PopupWithForm({ children, title, name, isOpen, onClose }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__button-close" onClick={onClose} type="button"></button>
        <form className="popup__form" name={name} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

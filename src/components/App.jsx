import '../index.css';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState('');

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(state => !state);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(state => !state);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(state => !state);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard('');
  };

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="add_edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="user-name-input"
          className="popup__input popup__input_user-info_name"
          name="name"
          type="text"
          required
          placeholder="Имя"
          minLength="2"
          maxLength="40"
        />
        <span className="user-name-input-error popup__error"></span>
        <input
          id="user-job-input"
          className="popup__input popup__input_user-info_job"
          name="about"
          type="text"
          required
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
        />
        <span className="user-job-input-error popup__error"></span>

        <button className="popup__button-save popup__button-save_update_user-info" type="submit">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="add_photo"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="place-name-input"
          className="popup__input popup__input_place-info_name"
          name="name"
          type="text"
          required
          placeholder="Новое место"
          minLength="2"
          maxLength="30"
        />
        <span className="place-name-input-error popup__error"></span>
        <input
          id="place-url-input"
          className="popup__input popup__input_place-info_url"
          name="link"
          type="url"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="place-url-input-error popup__error"></span>

        <button className="popup__button-save popup__button-save_add_newplace" type="submit">
          Создать
        </button>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="avatar-change"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="avatar-url-input"
          className="popup__input popup__input_avatar_url"
          name="avatar"
          type="url"
          required
          placeholder="Ссылка на аватар"
        />
        <span className="avatar-url-input-error popup__error"></span>

        <button className="popup__button-save popup__button-save_popup_avatar" type="submit">
          Сохранить
        </button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <Footer />
    </>
  );
}

export default App;

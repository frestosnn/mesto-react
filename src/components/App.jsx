import '../index.css';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { api } from '../utils/Api.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        console.log(res);
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

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
    setSelectedCard({ name: '', link: '' });
  };

  //эта функция передается по ссылке onUpdateUser в EditProfilePopup
  const handleUpdateUser = obj => {
    api.editUserInfo(obj).then(res => {
      //обновляем  глобальный контекст
      setCurrentUser(res);
      closeAllPopups();
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <PopupWithForm
        buttonText="Создать"
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
      </PopupWithForm>

      <PopupWithForm
        buttonText="Сохранить"
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
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;

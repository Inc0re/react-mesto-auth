import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  return (
    <main className='content'>
      {currentUser && (
        <section className='profile'>
          <div
            className='profile__avatar'
            style={{
              backgroundImage: `url(${currentUser.avatar})`,
            }}
          >
            <button
              className='profile__avatar-edit'
              onClick={props.onEditAvatar}
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__edit-button'
              onClick={props.onEditProfile}
              type='button'
            />
            <p className='profile__job'>{currentUser.about}</p>
          </div>
          <button
            className='profile__add-button'
            onClick={props.onAddPlace}
            type='button'
          />
        </section>
      )}
      <section>
        <ul className='elements'>
          {cards.map(card => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

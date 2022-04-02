import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>What We Have Done!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='MUSS(ERC20) Token for Peers'
              label='MUSS Token'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Decentralized. Trusted. Safe. Storage'
              label='Blockchain Storage'
              path='/services'
            />
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;

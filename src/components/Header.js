import React from 'react';
import '../styles/header_styles.css';

export default function Header(props) {
  return (
    <div className='pinterest'>
      <div class='left'>
        <a href='/' class='logo'>
          <img src='./images/Pinterest-logo.png' alt='logo' className='logo' />
        </a>
        <a href='/' class='home'>
          Home
        </a>
      </div>
      <div class='search'>
        <i class='fas fa-search'></i>
        <input type='search' name='' placeholder='Search' id='' />
      </div>
      <div class='right'>
        <div onClick={() => props.setShowModal(true)} class='items'>
          <img src='./images/add.png' alt='down' style={{ width: '50%' }} />
        </div>
        <a href='/' class='items'>
          <img src='./images/setting-lines.png' alt='down' style={{ width: '50%' }} />
        </a>
        <a href='/' class='avatar'>
          <div class='img'>
            <img src='https://avatars.githubusercontent.com/u/45184925?v=4' alt='' />
          </div>
        </a>
        <a href='/' class='items-down'>
          <img src='./images/down-arrow.png' alt='down' className='logo' />
        </a>
      </div>
      {/* </div> */}
    </div>
  );
}

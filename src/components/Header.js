import React from 'react';
import '../styles/header_styles.css';

export default function Header() {
  return (
    // <div className='header'>
    //   <div className='home'>1</div>
    //   <div className='board'>2</div>
    //   <div className='searchbar' style={{ width: '50%', justifyContent: 'center' }}>
    //     3
    //   </div>
    //   <div className='profile'>4</div>
    //   <div className='dropdown'>5</div>
    // </div>
    <div className='pinterest'>
      {/* <div class='pinterest'> */}
      <div class='left'>
        <a href='http://localhost:3000/' class='logo'>
          <img src='./images/Pinterest-logo.png' alt='logo' className='logo' />
        </a>
        <a href='http://localhost:3000/' class='home'>
          Home
        </a>
      </div>
      <div class='search'>
        <i class='fas fa-search'></i>
        <input type='search' name='' placeholder='Search' id='' />
      </div>
      <div class='right'>
        <a href='http://localhost:3000/' class='items'>
          <img src='./images/add.png' alt='down' style={{ width: '50%' }} />
        </a>
        <a href='http://localhost:3000/' class='items'>
          <img src='./images/setting-lines.png' alt='down' style={{ width: '50%' }} />
        </a>
        <a href='http://localhost:3000/' class='avatar'>
          <div class='img'>
            <img src='https://avatars.githubusercontent.com/u/45184925?v=4' alt='' />
          </div>
        </a>
        <a href='http://localhost:3000/' class='items-down'>
          <img src='./images/down-arrow.png' alt='down' className='logo' />
        </a>
      </div>
      {/* </div> */}
    </div>
  );
}

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
          <i class='fas fa-bell'></i>
        </a>
        <a href='http://localhost:3000/' class='items'>
          <i class='far fa-comment-dots'></i>
        </a>
        <a href='http://localhost:3000/' class='avatar'>
          <div class='img'>
            <img src='https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1488&q=80' alt='' />
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

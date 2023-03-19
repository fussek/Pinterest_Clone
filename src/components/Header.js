import React, { useState } from 'react';
import '../styles/header_styles.css';
import DropdownModal from './DropdownModal';

function filterResults(event, props) {
  let filteredPins = props.pinsToFilter.filter((pin) => {
    return pin.props.pinDetails.title.indexOf(event.target.value) > -1;
  });
  props.filterPins(filteredPins);
}

function Header(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className='pinterest'>
      <div className='left'>
        <a href='/' className='logo'>
          <img src='./images/fussek-logo-pinterest.png' alt='logo' className='logo' />
        </a>
        <a href='/' className='home'>
          Home
        </a>
      </div>
      <div className='search'>
        <img src='./images/loupe.png' alt='loupe' style={{ maxHeight: '50%', paddingLeft: '15px', paddingRight: '10px', opacity: '0.5' }} />
        <input onChange={(event) => filterResults(event, props)} type='search' name='' placeholder='Search' id='' />
      </div>
      <div className='right'>
        <div onClick={() => props.setShowModal(true)} className='items'>
          <img src='./images/add.png' alt='down' style={{ width: '50%' }} />
        </div>
        <div onClick={() => setShowDropdown(!showDropdown)} className='items'>
          <img src='./images/setting-lines.png' alt='down' style={{ width: '50%' }} />
        </div>
        <a href='/' className='avatar'>
          <div className='img'>
            <img src='https://avatars.githubusercontent.com/u/45184925?v=4' alt='' />
          </div>
        </a>
        <div onClick={() => setShowDropdown(!showDropdown)} className='items-down'>
          <img src='./images/down-arrow.png' alt='down' className='logo' />
        </div>
      </div>
      {showDropdown ? <DropdownModal showDropdown={showDropdown} setShowDropdown={setShowDropdown} /> : null}
    </div>
  );
}

export default Header;

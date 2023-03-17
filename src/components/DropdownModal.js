import React from 'react';
import '../styles/dropdown_modal_styles.css';

const Menu = ['Delete', 'Open', 'Save as favorite', 'Download Image'];

function DropdownModal(props) {
  return (
    <div className='dropdown'>
      {props.showDropdown && (
        <ul className='options'>
          {Menu.map((menu) => (
            <li className='option' key={menu}>
              {menu}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownModal;

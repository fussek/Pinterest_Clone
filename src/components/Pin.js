import React from 'react';

import '../styles/pin_styles.css';

function checkSize(event) {
  const image = event.target;
  image.classList.add('pin_max_width');
  if (image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width || image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().height) {
    image.classList.remove('pin_max_width');
    image.classList.add('pin_max_height');
  }
  image.style.opacity = 1;
}

function Pin(props) {
  return (
    <div className={`card card_${props.pinDetails.pin_size}`}>
      <div className='pin_title'>{props.pinDetails.title}</div>

      <div className='pin_modal'>
        <div className='modal_head'>
          <div className='save_card'>Save</div>
        </div>

        <div className='modal_foot'>
          <div className='destination'>
            <div className='pint_mock_icon_container'>
              <img src='./images/upper-right-arrow.png' alt='destination' className='pint_mock_icon' />
            </div>
            <span>{props.pinDetails.destination}</span>
          </div>

          <div className='pint_mock_icon_container'>
            <img src='./images/send.png' alt='send' className='pint_mock_icon' />
          </div>

          <div className='pint_mock_icon_container'>
            <img src='./images/ellipse.png' alt='edit' className='pint_mock_icon' />
          </div>
        </div>
      </div>

      <div className='pin_image'>
        <img onLoad={checkSize} src={props.pinDetails.img_blob} alt='pin_image' />
      </div>
    </div>
  );
}

export default Pin;

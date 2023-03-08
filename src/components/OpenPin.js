import React, { useState } from 'react';

import '../styles/open_pin_styles.css';
import EnlargeImg from './EnlargeImg';

function checkSize(event) {
  const image = event.target;
  image.classList.add('open_pin_max_width');
  if (image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width || image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().height) {
    image.classList.remove('open_pin_max_width');
    image.classList.add('open_pin_max_height');
  }
  image.style.opacity = 1;
}

function OpenPin(props) {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  const [showLargeImg, setShowLargeImg] = useState(false);

  return (
    <div className='open_pin_modal'>
      {showLargeImg ? <EnlargeImg src={props.pinDetails.img_url} showLargeImg={showLargeImg} setShowLargeImg={setShowLargeImg} /> : null}
      <div className='open_pin_container'>
        <div className='side' id='left_side'>
          <div className='open_section'>
            <div className='open_modals_pin'>
              <div className='open_pin_image' onClick={() => setShowLargeImg(!showLargeImg)}>
                {showLargeImg ? null : <img onLoad={checkSize} src={props.pinDetails.img_url} alt='pin_image' style={{ cursor: showLargeImg ? null : 'pointer' }} />}
              </div>
            </div>
          </div>
        </div>
        <div className='side' id='right_side'>
          {/* <div className='section1'>♡</div> */}
          <div className='open_section'>
            {/* <div className='save_card'>♡</div> */}
            <div className='open_pin_title'>{props.pinDetails.title}</div>
            <div className='new_pin_input'>{props.pinDetails.description}</div>
            <div className='new_pin_input'>{props.pinDetails.destination}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenPin;

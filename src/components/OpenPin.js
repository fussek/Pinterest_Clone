import React from 'react';

import '../styles/open_pin_styles.css';

function checkSize(event) {
  const image = event.target;
  image.classList.add('open_pin_max_width');
  if (image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width || image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().height) {
    image.classList.remove('open_pin_max_width');
    image.classList.add('open_pin_max_height');
  }
  image.style.opacity = 1;
}

// function enlargeImg(event) {
//   const image = event.target;
//   image.style.transform = 'scale(1.5)';
//   image.style.transition = 'transform 0.25s ease';
// }

function OpenPin(props) {
  return (
    <div className='open_pin_modal'>
      <div className='open_pin_container'>
        <div className='side' id='left_side'>
          <div className='open_section2'>
            <div className='open_modals_pin' style={{ display: 'block', opacity: 1 }}>
              <div className='open_pin_image'>
                <img onLoad={checkSize} src={props.pinDetails.img_blob} alt='pin_image' style={{ opacity: 1 }} />
              </div>
            </div>
          </div>
        </div>
        <div className='side' id='right_side'>
          {/* <div className='section1'>♡</div> */}
          <div className='open_section2'>
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

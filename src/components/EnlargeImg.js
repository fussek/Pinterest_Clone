import React from 'react';
import '../styles/enlarge_img_styles.css';

function handleClick(props) {
  props.setShowLargeImg(!props.showLargeImg);
}

function EnlargeImg(props) {
  return (
    <div className='background'>
      <img onClick={() => handleClick(props)} className='image' src={props.src} alt='img' />
    </div>
  );
}

export default EnlargeImg;

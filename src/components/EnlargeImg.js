import React from 'react';
import '../styles/enlarge_img_styles.css';

function EnlargeImg(props) {
  return <img onClick={() => props.setShowLargeImg(!props.showLargeImg)} className='image' src={props.src} alt='img' />;
}

export default EnlargeImg;

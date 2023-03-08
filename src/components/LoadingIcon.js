import React from 'react';
import '../styles/loading_icon.css';

export default function LoadingIcon() {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

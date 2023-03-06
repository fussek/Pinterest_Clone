import React from 'react';
import '../styles/loading_icon.css';

export default function LoadingIcon() {
  return (
    <div class='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

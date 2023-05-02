import React, { useState } from 'react';
import '../styles/guidelines_styles.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const FinalBoardSteps = [
  {
    title: 'Welcome :)',
    content: 'Follow this quick tutorial to go through all the functionalities smoothly',
    target: '#root',
    placement: 'center',
  },
  {
    title: 'Pin board',
    content:
      'This is your pins board, from here you can browse all your saved pins, highlight your favorite ones or delete those unwanted. The layout is responsive, so the pins will re-arrange themselves automatically if the window size changes.',
    target: '#pin_container',
    placement: 'top-end',
  },
  {
    title: 'Control buttons',
    content: 'Those are the control buttons, you can upload a new pin to the table, generate a random pin, refresh the table if needed or open help dialogue.',
    target: '#navigation_bar',
    placement: 'auto',
  },
  {
    title: 'Header bar',
    content: 'Use search bar to browse through available pins. The search bar is dynamic, so the pins will get fitered according to your search criterias right away :)',
    target: '#header_bar',
    placement: 'bottom',
  },
];
export const ModalSteps = [
  {
    title: 'Adding new pin',
    content: 'Here you can upload a new pin from your device.',
    target: '#root',
    placement: 'center',
  },
  {
    title: 'Upload image',
    content: 'Those are the control buttons, you can upload a new pin to the table, generate a random pin, refresh the table if needed or open help dialogue.',
    target: '#upload_img_container',
    placement: 'right',
  },
  {
    title: 'Control buttons',
    content: 'Those are the control buttons, you can upload a new pin to the table, generate a random pin, refresh the table if needed or open help dialogue.',
    target: '#pin_details',
    placement: 'auto',
  },
  {
    title: 'Header bar',
    content: 'Use search bar to browse through available pins',
    target: '#tags_container',
    placement: 'auto',
  },
  {
    title: 'Header bar',
    content: 'Use search bar to browse through available pins',
    target: '#select_size',
    placement: 'auto',
  },
];
export const OpenPinSteps = [
  {
    title: 'Pin window',
    content: 'From here you can read the details of saved pin and edit/delete it.',
    target: '#root',
    placement: 'center',
  },
  {
    title: 'Enlarge image',
    content: 'Click here to view the image in its full size',
    target: '#left_side_open',
    placement: 'right',
  },
  {
    title: 'Pin details',
    content: 'Here are the details of the pin',
    target: '#right_side_open',
    placement: 'left',
  },
  {
    title: 'Options icon',
    content: 'Click to toggle editing mode or delete pin',
    target: '#options_icon',
    placement: 'left',
  },
];

export function Guidelines() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <div className='guidelines_modal'>
      <div className='guidelines_container'>
        <div className='small_side' id='left_side_guidelines'>
          <div className='guidelines_section'>
            <Button shape='circle' icon={<LeftOutlined />} style={{ opacity: '0.8' }} />
          </div>
        </div>
        <div className='small_side' id='central_side_guidelines'>
          <div className='guidelines_section'>
            <div className='guidelines_image'>
              <img src='./images/loupe.png' alt='loupe' style={{ maxHeight: '50%', opacity: '0.5' }} />
            </div>
          </div>
        </div>
        <div className='small_side' id='right_side_guidelines'>
          <div className='guidelines_section'>
            <Button shape='circle' icon={<RightOutlined />} style={{ opacity: '0.8' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

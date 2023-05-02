import React from 'react';
import '../styles/guidelines_styles.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const FinalBoardSteps = [
  {
    title: 'Welcome :)',
    content: 'Hi there 👋. Welcome to my website 😊. Let these small pop-ups guide you through the navigation 🗺️, so you can enjoy the full experience 📌. Lets get started!',
    target: '#root',
    placement: 'center',
  },
  {
    title: 'Pin board',
    content:
      'This is your pins board, from here you can browse all your saved pins 📌, highlight favorite ones 🧡 or delete those unwanted 🗑️. The layout is responsive, so the pins will re-arrange themselves automatically according to window size ⚙️.',
    target: '#pin_container',
    placement: 'top-end',
  },
  {
    title: 'Control buttons',
    content: 'Those are the control buttons, you can upload a new pin to the board ➕, generate a random pin 🎲, refresh the table if needed 🔄 or open the guidelines dialogue ❓.',
    target: '#navigation_bar',
    placement: 'auto',
  },
  {
    title: 'Header bar',
    content: 'Use search bar to browse through available pins 🔍. The search works dynamically, so the pins will get fitered accordingly as you type 😊.',
    target: '#header_bar',
    placement: 'bottom',
  },
];
export const ModalSteps = [
  {
    title: 'Adding new pin',
    content: 'Here you can upload a new pin from your local storage 💾.',
    target: '#root',
    placement: 'center',
  },
  {
    title: 'Upload image',
    content: 'Click here to upload your image 📁. It is best to use high quality images, but not larger than 20MBs 📷.',
    target: '#upload_img_container',
    placement: 'right',
  },
  {
    title: 'Pin details',
    content: 'In here you input the details about the pin 📜, such as title, destination URL, description as well as tags #️⃣, based on which user browses through the pins 📌.',
    target: '#pin_details',
    placement: 'auto',
  },
  {
    title: 'Tags section',
    content: 'This is the tags section #️⃣, you can add new tags by typing words and clicking Enter, or delete them by clicking on the white cross.',
    target: '#tags_container',
    placement: 'auto',
  },
  {
    title: 'Size of the pin',
    content: 'Select the desired size of the pin, there are 3 sizes available - small, medium and large 📐. The Pin is uploaded by clicking Save button.',
    target: '#select_size',
    placement: 'auto',
  },
];
export const OpenPinSteps = [
  {
    title: 'Open Pin window',
    content: 'From here you can read the details of saved pin 📌 and edit/delete it.',
    target: '#root',
    placement: 'center',
  },
  {
    title: 'Enlarge image',
    content: 'Click here to enlarge the image to its original size 🔎.',
    target: '#left_side_open',
    placement: 'right',
  },
  {
    title: 'Pin details',
    content: 'Here are the details 📜 of the pin.',
    target: '#right_side_open',
    placement: 'left',
  },
  {
    title: 'Options icon',
    content: 'Click to toggle editing mode ✍️ or delete pin 🗑️.',
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

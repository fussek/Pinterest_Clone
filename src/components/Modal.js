import React, { useState, useEffect } from 'react';
import LoadingIcon from './LoadingIcon';
import TagsCreator from './TagsCreator';

import { savePinBackend } from '../firebase_setup/DatabaseOperations.js';
import '../styles/modal_styles.css';
let img_file;

function uploadImage(event, pinDetails, setPinDetails, setShowLabel, setShowModalPin) {
  if (event.target.files && event.target.files[0]) {
    if (/image\/*/.test(event.target.files[0].type)) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        setPinDetails({
          ...pinDetails,
          img_url: reader.result,
        });
        setShowLabel(false);
        setShowModalPin(true);
      };
      img_file = event.target.files[0];
    }
  }
}
function checkSize(event) {
  const image = event.target;
  image.classList.add('pin_max_width');
  if (image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width || image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().height) {
    image.classList.remove('pin_max_width');
    image.classList.add('pin_max_height');
  }
  image.style.opacity = 1;
}

async function savePin(setIsLoading, e, pinDetails, refreshPins) {
  setIsLoading(true);
  const users_data = {
    ...pinDetails,
    author: 'Patryk',
    board: 'default',
    title: document.querySelector('#pin_title').value,
    description: document.querySelector('#pin_description').value,
    destination: document.querySelector('#pin_destination').value,
    pin_size: document.querySelector('#pin_size').value,
  };

  await savePinBackend(e, users_data, img_file);

  refreshPins(users_data);
  setIsLoading(false);
}

function Modal(props) {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const [pinDetails, setPinDetails] = useState({
    author: '',
    board: '',
    title: '',
    destination: '',
    description: '',
    img_url: '',
    pin_size: '',
    tags: [],
  });
  const [showLabel, setShowLabel] = useState(true);
  const [showModalPin, setShowModalPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const addTag = (event) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      setPinDetails({
        ...pinDetails,
        tags: tags,
      });
      event.target.value = '';
    }
  };

  return (
    <div className='add_pin_modal'>
      <div className='add_pin_container'>
        <div className='side' id='left_side'>
          <div className='section1'>
            <div className='pint_mock_icon_container'>
              <img src='./images/ellipse.png' alt='edit' className='pint_mock_icon' />
            </div>
          </div>
          <div className='section2'>
            <label htmlFor='upload_img' id='upload_img_label' style={{ display: showLabel ? 'block' : 'none' }}>
              <div className='upload_img_container'>
                <div id='dotted_border'>
                  <div className='pint_mock_icon_container'>
                    <img src='./images/up-arrow.png' alt='upload_img' className='pint_mock_icon' />
                  </div>
                  <div>Click to upload</div>
                  <div>Recommendation: Use high-quality .jpg less than 20MB</div>
                </div>
              </div>
              <input onChange={(event) => uploadImage(event, pinDetails, setPinDetails, setShowLabel, setShowModalPin)} type='file' name='upload_img' id='upload_img' value='' />
            </label>
            <div className='modals_pin' style={{ display: showModalPin ? 'block' : 'none' }}>
              <div className='pin_image'>
                <img onLoad={checkSize} src={pinDetails.img_url} alt='pin_image' />
              </div>
            </div>
          </div>

          <div className='section3'>
            <div className='save_from_site'>Save from site</div>
          </div>
        </div>
        <div className='side' id='right_side'>
          <div className='section1'>
            <div className='select_size'>
              <select defaultValue='medium' name='pin_size' id='pin_size'>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </select>
              <div onClick={(e) => savePin(setIsLoading, e, pinDetails, props.refreshPins)} className='save_pin'>
                Save
              </div>
            </div>
          </div>
          <div className='section2'>
            <input placeholder='Add your title' type='text' className='new_pin_input' id='pin_title' />
            <input placeholder='Describe what the Pin is about' type='text' className='new_pin_input' id='pin_description' />
            <input placeholder='Add a destination link' type='text' className='new_pin_input' id='pin_destination' />
            <input placeholder='Add tags by clicking Enter' type='text' className='new_pin_input' id='pin_tags' onKeyUp={(event) => (event.key === 'Enter' ? addTag(event) : null)} />
          </div>
          <div className='section3'>
            <TagsCreator tags={tags} setTags={setTags} editable={true} />
          </div>
        </div>
      </div>
      {isLoading ? <LoadingIcon /> : null}
    </div>
  );
}

export default Modal;

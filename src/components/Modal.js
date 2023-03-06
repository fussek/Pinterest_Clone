import React, { useState } from 'react';
import LoadingIcon from './LoadingIcon';
// import handleSubmit from '../firebase_setup/handleSubmit.js';
import { collection, addDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore } from '../firebase_setup/firebase.js';
import '../styles/modal_styles.css';
let imageFile;

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
      imageFile = event.target.files[0];
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

async function savePin(setIsLoading, e, pinDetails, addPin) {
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
  //todo: figure out saving to Firebase
  await savePinBackend(e, users_data);
  addPin(users_data);
  setIsLoading(false);
}

//todo: extract to external function, optimize, minimize API calls...
async function savePinBackend(e, users_data) {
  let docSnap;
  e.preventDefault();
  try {
    const docRef = await addDoc(collection(firestore, 'pins'), {
      ...users_data,
      img_url: '',
    });
    const storage = getStorage();
    const storageRef = ref(storage, docRef.id);
    await uploadBytes(storageRef, imageFile)
      .then((snapshot) => {
        console.log('Uploaded image for pin: ' + docRef.id);
        getDownloadURL(snapshot.ref)
          .then((url) => {
            updateDoc(docRef, { img_url: url })
              .then(() => {
                console.log('Update of pin sucessful!');
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('Document written with ID: ', docRef.id);
    docSnap = await getDoc(docRef);

    console.log(docSnap.data());
    return docSnap.data();
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

function Modal(props) {
  const [pinDetails, setPinDetails] = useState({
    author: '',
    board: '',
    title: '',
    destination: '',
    description: '',
    img_url: '',
    pin_size: '',
  });
  const [showLabel, setShowLabel] = useState(true);
  const [showModalPin, setShowModalPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
              <select defaultValue='Select' name='pin_size' id='pin_size'>
                <option value=''>Select</option>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </select>
              <div onClick={(e) => savePin(setIsLoading, e, pinDetails, props.addPin)} className='save_pin'>
                Save
              </div>
            </div>
          </div>
          <div className='section2'>
            <input placeholder='Add your title' type='text' className='new_pin_input' id='pin_title' />
            <input placeholder='Describe what the Pin is about' type='text' className='new_pin_input' id='pin_description' />
            <input placeholder='Add a destination link' type='text' className='new_pin_input' id='pin_destination' />
          </div>
        </div>
      </div>
      {isLoading ? <LoadingIcon /> : null}
    </div>
  );
}

export default Modal;

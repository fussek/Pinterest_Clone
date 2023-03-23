import React, { useState } from 'react';
import '../styles/pin_styles.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Button, Space, Tooltip } from 'antd';

function checkSize(event) {
  const image = event.target;
  image.classList.add('pin_max_width');
  if (image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width || image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().height) {
    image.classList.remove('pin_max_width');
    image.classList.add('pin_max_height');
  }
  image.style.opacity = 1;
}
function deletePin(pinDetails, deletePin) {
  //todo export sweetAlert popups to external file
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: 'Delete this pin?',
    icon: 'error',
    width: 300,
    showCancelButton: true,
    confirmButtonColor: '#2ca34c',
    cancelButtonColor: '#e6002390',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      const pin_data = {
        ...pinDetails,
      };
      deletePin(pin_data);
      MySwal.fire({
        title: 'Deleted!',
        icon: 'success',
        width: 300,
      });
    }
  });
}

function openPin(pinDetails, openPin) {
  const pin_data = {
    ...pinDetails,
  };
  openPin(pin_data);
}

function handleDropdownCLick(e, setShowDropdown, showDropdown) {
  e.stopPropagation();
  setShowDropdown(!showDropdown);
}

function Pin(props) {
  const items = [
    {
      label: <span>Edit</span>,
      key: '0',
    },
    {
      label: <span>Properties</span>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <span onClick={() => deletePin(props.pinDetails, props.deletePin)}>Delete</span>,
      key: '3',
    },
  ];
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className={`card card_${props.pinDetails.pin_size}`}>
      <div className='pin_title'>{props.pinDetails.title}</div>

      <div onClick={() => openPin(props.pinDetails, props.openPin)} className='pin_modal'>
        <div className='modal_head'>
          <div className='save_card'>♡</div>
        </div>

        <div className='modal_foot'>
          <a href={props.pinDetails.destination}>
            <div className='destination'>
              <div className='pint_mock_icon_container'>
                <img src='./images/upper-right-arrow.png' alt='destination' className='pint_mock_icon' />
              </div>
              <span>{props.pinDetails.destination}</span>
            </div>
          </a>
          <div onClick={(e) => handleDropdownCLick(e, setShowDropdown, showDropdown)} className='pint_mock_icon_container'>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Space direction='vertical'>
                <Space wrap>
                  <Tooltip title='More'>
                    <Button type='default' shape='circle' icon={<MoreOutlined />} />
                  </Tooltip>
                </Space>
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className='pin_image'>
        <img onLoad={checkSize} src={props.pinDetails.img_url} alt='pin_image' />
      </div>
    </div>
  );
}

export default Pin;

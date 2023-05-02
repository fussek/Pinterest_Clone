import React, { useState, useEffect } from 'react';
import EnlargeImg from './EnlargeImg';
import '../styles/open_pin_styles.css';
import TagsCreator from './TagsCreator';
import ReactJoyride from 'react-joyride';
import { OpenPinSteps } from './Guidelines';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Button, Space, Tooltip } from 'antd';

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

function checkSize(event) {
  const image = event.target;
  image.classList.add('open_pin_max_width');
  if (image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width || image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().height) {
    image.classList.remove('open_pin_max_width');
    image.classList.add('open_pin_max_height');
  }
  image.style.opacity = 1;
}

function OpenPin(props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  const [showLargeImg, setShowLargeImg] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const items = [
    {
      label: <span onClick={() => setIsEditable(!isEditable)}>Edit</span>,
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

  return (
    <div className='open_pin_modal'>
      {showLargeImg ? <EnlargeImg src={props.pinDetails.img_url} showLargeImg={showLargeImg} setShowLargeImg={setShowLargeImg} /> : null}
      <div className='open_pin_container'>
        <div className='side' id='left_side_open'>
          <div className='open_section'>
            <div className='open_modals_pin'>
              <Tooltip title='Click to enlarge image' placement='bottom'>
                <div className='open_pin_image' onClick={() => setShowLargeImg(!showLargeImg)}>
                  {showLargeImg ? null : <img onLoad={checkSize} src={props.pinDetails.img_url} alt='pin_image' />}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className='side' id='right_side_open'>
          <div className='options_icon_container' id='options_icon'>
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
          {/* <div className='section1'>♡</div> */}
          <div className='open_section'>
            {/* <div className='save_card'>♡</div> */}
            <div className='open_pin_title'>{props.pinDetails.title}</div>
            <div className='new_pin_input'>{props.pinDetails.description}</div>
            <TagsCreator tags={props.pinDetails.tags} editable={isEditable} />
            {/* <div className='new_pin_input'>{props.pinDetails.destination}</div> */}
          </div>
        </div>
      </div>
      <ReactJoyride
        continuous
        hideCloseButton
        scrollToFirstStep
        disableScrolling={true}
        showProgress
        showSkipButton
        // stepIndex={0}
        steps={OpenPinSteps}
        styles={{
          options: {
            primaryColor: '#ff0400',
            textColor: '#004a14',
            zIndex: 1000,
          },
        }}
      />
    </div>
  );
}

export default OpenPin;

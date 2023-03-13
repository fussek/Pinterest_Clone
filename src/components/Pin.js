import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../styles/pin_styles.css';
const MySwal = withReactContent(Swal);

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
  MySwal.fire({
    title: 'Are you sure?',
    text: 'Confirm deletion of the Pin',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#e60023',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      const pin_data = {
        ...pinDetails,
      };
      deletePin(pin_data);
      MySwal.fire('Deleted!', 'Pin has been deleted.', 'success');
    }
  });
}

function openPin(pinDetails, openPin) {
  const pin_data = {
    ...pinDetails,
  };
  openPin(pin_data);
}

function Pin(props) {
  return (
    <div className={`card card_${props.pinDetails.pin_size}`}>
      <div className='pin_title'>{props.pinDetails.title}</div>

      <div className='pin_modal'>
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
          <div onClick={() => openPin(props.pinDetails, props.openPin)} className='pint_mock_icon_container'>
            <img src='./images/send.png' alt='send' className='pint_mock_icon' />
          </div>

          <div onClick={() => alert(props.pinDetails.title)} className='pint_mock_icon_container'>
            <img src='./images/ellipse.png' alt='edit' className='pint_mock_icon' />
          </div>

          <div onClick={() => deletePin(props.pinDetails, props.deletePin)} className='pint_mock_icon_container'>
            <img src='./images/trash.png' alt='delete' className='pint_mock_icon' />
          </div>
        </div>
      </div>

      {/* <div onClick={(event) => (event.target.className === 'add_pin_modal' ? this.setState({ show_open_pin: false }) : null)} className='add_pin_modal_container'>
        {this.state.show_open_pin ? <OpenPin pinDetails={this.pinDetails} /> : null}
      </div> */}

      <div className='pin_image'>
        <img onLoad={checkSize} src={props.pinDetails.img_url} alt='pin_image' />
      </div>
    </div>
  );
}

export default Pin;

import React from 'react';

import '../styles/final_board_styles.css';
import RandomPin from './RandomPin.js';
import Pin from './Pin.js';
import Modal from './Modal.js';
import OpenPin from './OpenPin.js';

class FinalBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: [],
      show_modal: false,
      show_open_pin: false,
    };
  }

  addPin = (pinDetails) => {
    this.setState((_state) => {
      const new_pins = [..._state.pins];
      new_pins.push(<Pin pinDetails={pinDetails} key={_state.pins.length} openPin={this.openPin} />);

      return {
        pins: new_pins,
        show_modal: false,
        show_open_pin: false,
      };
    });
  };

  openPin = (pinDetails) => {
    this.pinDetails = pinDetails;
    this.setState((_state) => {
      return {
        ..._state,
        show_modal: false,
        show_open_pin: true,
      };
    });
    //todo: set the open pin modal to center of the screen (when scrolled down the page)
  };

  shufflePins() {
    let newPin = RandomPin();
    this.addPin(newPin);
  }

  render() {
    return (
      <div>
        <div className='navigation_bar'>
          <div onClick={() => this.setState({ show_modal: true })} className='pint_mock_icon_container add_pin'>
            <img src='./images/add.png' alt='add_pin' className='pint_mock_icon' />
          </div>
          <div className='pint_mock_icon_container add_pin'>
            <img src='./images/ellipse.png' alt='menu' className='pint_mock_icon' />
          </div>
          <div onClick={() => this.shufflePins()} className='pint_mock_icon_container add_pin'>
            <img src='./images/shuffle.png' alt='shuffle' className='pint_mock_icon' />
          </div>
        </div>
        <div className='pin_container'>{this.state.pins}</div>
        <div onClick={(event) => (event.target.className === 'add_pin_modal' ? this.setState({ show_modal: false }) : null)} className='add_pin_modal_container'>
          {this.state.show_modal ? <Modal addPin={this.addPin} /> : null}
        </div>
        <div onClick={(event) => (event.target.className === 'open_pin_modal' ? this.setState({ show_open_pin: false }) : null)} className='open_pin_modal_container'>
          {this.state.show_open_pin ? <OpenPin pinDetails={this.pinDetails} /> : null}
        </div>
      </div>
    );
  }
}

export default FinalBoard;

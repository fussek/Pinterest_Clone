import React from 'react';
import RandomPin from './RandomPin.js';
import Pin from './Pin.js';
import Modal from './Modal.js';
import OpenPin from './OpenPin.js';
import Header from './Header';
import { Guidelines, FinalBoardSteps } from './Guidelines.js';
import LoadingIcon from './LoadingIcon';
import ReactJoyride from 'react-joyride';
import { deletePinBackend, fetchPinsBackend } from '../firebase_setup/DatabaseOperations.js';
import { Tooltip } from 'antd';

import '../styles/final_board_styles.css';

import autoAnimate from '@formkit/auto-animate';

class FinalBoard extends React.Component {
  constructor(props) {
    super(props);
    this.animate = React.createRef();

    this.state = {
      pinsFromDb: [],
      pinsToShow: [],
      show_modal: false,
      show_open_pin: false,
      show_guidelines: false,
      show_loading: false,
    };
  }

  componentDidMount() {
    this.fetchPins();
    this.animate.current && autoAnimate(this.animate.current);
  }

  fetchPins = async () => {
    let pinsArray = [];
    let fetchedPins = await fetchPinsBackend().catch((error) => console.error(error));
    fetchedPins.forEach((p) => {
      pinsArray.push(<Pin pinDetails={p} key={p.id} openPin={this.openPin} deletePin={this.deletePin} />);
    });
    this.setState((_state) => {
      return {
        ..._state,
        pinsFromDb: pinsArray,
        pinsToShow: pinsArray,
      };
    });
  };

  refreshPins = async () => {
    this.setState({ show_modal: false });
    await this.fetchPins();
  };

  openPin = (pinDetails) => {
    this.pinDetails = pinDetails;
    this.setState({ show_open_pin: true });
  };

  deletePin = async (pinDetails) => {
    //todo: add loading mode and/or transition state (blur the pin, fade it out etc)
    await deletePinBackend(pinDetails);
    await this.fetchPins();
    this.setState({ show_open_pin: false });
  };

  generateRandomPin = async (event) => {
    this.setState({ show_loading: true });
    await RandomPin(event);
    await this.fetchPins();
    this.setState({ show_loading: false });
  };

  filterPins = (filteredPins) => {
    this.setState({ pinsToShow: filteredPins });
  };

  render() {
    return (
      <div style={{ overflow: 'hidden' }} ref={this.windowRef}>
        <div class='header_container' id='header_bar'>
          <Header pinsToFilter={this.state.pinsFromDb} filterPins={this.filterPins} />
        </div>
        <div className='navigation_bar' id='navigation_bar'>
          <Tooltip title='Add new Pin'>
            <div onClick={() => this.setState({ show_modal: true })} className='pint_mock_icon_container' id='add_pin'>
              <img src='./images/add.png' alt='add_pin' className='pint_mock_icon' />
            </div>
          </Tooltip>
          <Tooltip title='Generate random Pin'>
            <div onClick={(event) => this.generateRandomPin(event)} className='pint_mock_icon_container add_pin'>
              <img src='./images/shuffle.png' alt='random' className='pint_mock_icon' />
            </div>
          </Tooltip>
          <Tooltip title='Refresh Pins'>
            <div onClick={() => this.refreshPins()} className='pint_mock_icon_container add_pin'>
              <img src='./images/refresh.png' alt='refresh' className='pint_mock_icon' />
            </div>
          </Tooltip>
          <Tooltip title='Show guidelines'>
            <div onClick={() => this.setState({ show_guidelines: true })} className='pint_mock_icon_container add_pin'>
              <img src='./images/help.png' alt='help' className='pint_mock_icon' />
            </div>
          </Tooltip>
        </div>
        <div className='pin_container' ref={this.animate} id='pin_container'>
          {this.state.pinsToShow}
        </div>
        <div onClick={(event) => (event.target.className === 'add_pin_modal' ? this.setState({ show_modal: false }) : null)} className='add_pin_modal_container'>
          {this.state.show_modal ? <Modal refreshPins={this.refreshPins} /> : null}
        </div>
        <div onClick={(event) => (event.target.className === 'open_pin_modal' ? this.setState({ show_open_pin: false }) : null)} className='open_pin_modal_container'>
          {this.state.show_open_pin ? <OpenPin pinDetails={this.pinDetails} deletePin={this.deletePin} /> : null}
        </div>
        <div onClick={(event) => (event.target.className === 'guidelines_modal' ? this.setState({ show_guidelines: false }) : null)} className='guidelines_modal_container'>
          {this.state.show_guidelines ? <Guidelines /> : null}
        </div>
        {this.state.show_loading ? <LoadingIcon /> : null}
        <ReactJoyride
          continuous
          hideCloseButton
          scrollToFirstStep
          disableScrolling={true}
          showProgress
          showSkipButton
          steps={FinalBoardSteps}
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
}

export default FinalBoard;

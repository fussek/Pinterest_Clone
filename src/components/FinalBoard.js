import React from 'react';
import RandomPin from './RandomPin.js';
import Pin from './Pin.js';
import Modal from './Modal.js';
import OpenPin from './OpenPin.js';
import Header from './Header';
import Guidelines from './Guidelines.js';
import LoadingIcon from './LoadingIcon';
import { deletePinBackend } from '../firebase_setup/DatabaseOperations.js';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase.js';

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
  //todo: extract setting state method, for the love of god
  fetchPins = async () => {
    //todo: figure out extracting this to DatabaseOperations.js
    await getDocs(collection(firestore, 'pins')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let fetchedPins = [];
      newData.forEach((p) => {
        fetchedPins.push(<Pin pinDetails={p} key={p.id} openPin={this.openPin} deletePin={this.deletePin} />);
      });
      this.setState((_state) => {
        return {
          ..._state,
          pinsFromDb: fetchedPins,
          pinsToShow: fetchedPins,
        };
      });
    });
  };
  //todo: extract setting state method, for the love of god
  refreshPins = async () => {
    this.setState((_state) => {
      return {
        ..._state,
        show_modal: false,
      };
    });
    await this.fetchPins();
  };
  //todo: extract setting state method, for the love of god
  openPin = (pinDetails) => {
    this.pinDetails = pinDetails;
    this.setState((_state) => {
      return {
        ..._state,
        show_open_pin: true,
      };
    });
  };
  //todo: extract setting state method, for the love of god
  deletePin = async (pinDetails) => {
    //todo: add loading mode and/or transition state (blur the pin, fade it out etc)
    await deletePinBackend(pinDetails);
    await this.fetchPins();
    this.setState((_state) => {
      return {
        ..._state,
        show_open_pin: false,
      };
    });
  };
  //todo: extract setting state method, for the love of god
  generateRandomPin = async (event) => {
    this.setState((_state) => {
      return {
        ..._state,
        show_loading: true,
      };
    });
    await RandomPin(event);
    await this.refreshPins();
    this.setState((_state) => {
      return {
        ..._state,
        show_loading: false,
      };
    });
  };
  //todo: extract setting state method, for the love of god
  setShowModal = (showState) => {
    this.setState((_state) => {
      return {
        ..._state,
        show_modal: showState,
      };
    });
  };
  //todo: extract setting state method, for the love of god
  filterPins = (filteredPins) => {
    this.setState((_state) => {
      return {
        ..._state,
        pinsToShow: filteredPins,
      };
    });
  };

  render() {
    return (
      <div>
        <Header pinsToFilter={this.state.pinsFromDb} filterPins={this.filterPins} setShowModal={this.setShowModal} />
        <div className='navigation_bar'>
          <div tooltip='Add new Pin' onClick={() => this.setState({ show_modal: true })} className='pint_mock_icon_container' id='add_pin'>
            <img src='./images/add.png' alt='add_pin' className='pint_mock_icon' />
          </div>
          <div tooltip='Generate random Pin' onClick={(event) => this.generateRandomPin(event)} className='pint_mock_icon_container add_pin'>
            <img src='./images/shuffle.png' alt='random' className='pint_mock_icon' />
          </div>
          <div tooltip='Refresh Pins' onClick={() => this.refreshPins()} className='pint_mock_icon_container add_pin'>
            <img src='./images/refresh.png' alt='refresh' className='pint_mock_icon' />
          </div>
          <div tooltip='Show guidelines' onClick={() => alert('Guidelines are in the making :)')} className='pint_mock_icon_container add_pin'>
            <img src='./images/help.png' alt='help' className='pint_mock_icon' />
          </div>
        </div>
        <div className='pin_container' ref={this.animate}>
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
      </div>
    );
  }
}

export default FinalBoard;

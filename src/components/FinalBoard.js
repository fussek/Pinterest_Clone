import React from 'react';

import '../styles/final_board_styles.css';
import RandomPin from './RandomPin.js';
import Pin from './Pin.js';
import Modal from './Modal.js';
import OpenPin from './OpenPin.js';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase.js';

// function FinalBoard() {
//   var thePin = {};
//   const [boardDetails, setBoardDetails] = useState({
//     pins: [],
//     show_modal: false,
//     show_open_pin: false,
//   });

//   const openPin = (pinDetails) => {
//     thePin = { ...pinDetails };
//     setBoardDetails((boardDetails) => {
//       return {
//         ...boardDetails,
//         show_modal: false,
//         show_open_pin: true,
//       };
//     });
//     //todo: set the open pin modal to center of the screen (when scrolled down the page)
//   };

//   const shufflePins = () => {
//     let newPin = RandomPin();
//     addPin(newPin);
//   };

//   const addPin = (pinDetails) => {
//     setBoardDetails((boardDetails) => {
//       const new_pins = [...boardDetails.pins];
//       new_pins.push(<Pin pinDetails={pinDetails} key={boardDetails.pins.length} openPin={openPin} />);
//       // openPin={openPin}
//       return {
//         pins: new_pins,
//         show_modal: false,
//         show_open_pin: false,
//       };
//     });
//   };

//   return (
//     <div>
//       <div className='navigation_bar'>
//         <div onClick={() => setBoardDetails({ ...boardDetails, show_modal: true })} className='pint_mock_icon_container add_pin'>
//           <img src='./images/add.png' alt='add_pin' className='pint_mock_icon' />
//         </div>
//         <div className='pint_mock_icon_container add_pin'>
//           <img src='./images/ellipse.png' alt='menu' className='pint_mock_icon' />
//         </div>
//         <div onClick={() => shufflePins()} className='pint_mock_icon_container add_pin'>
//           <img src='./images/shuffle.png' alt='shuffle' className='pint_mock_icon' />
//         </div>
//       </div>
//       <div className='pin_container'>{boardDetails.pins}</div>
//       <div onClick={(event) => (event.target.className === 'add_pin_modal' ? setBoardDetails({ ...boardDetails, show_modal: false }) : null)} className='add_pin_modal_container'>
//         {boardDetails.show_modal ? <Modal addPin={addPin} /> : null}
//       </div>
//       <div onClick={(event) => (event.target.className === 'open_pin_modal' ? setBoardDetails({ ...boardDetails, show_open_pin: false }) : null)} className='open_pin_modal_container'>
//         {boardDetails.show_open_pin ? <OpenPin pinDetails={thePin} /> : null}
//       </div>
//     </div>
//   );
// }

// export default FinalBoard;

class FinalBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: [],
      show_modal: false,
      show_open_pin: false,
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

  //todo: https://ordinarycoders.com/blog/article/reactjs-best-practices
  // use componentDidMount() lifecycle method here

  fetchPost = async () => {
    this.setState({ is_loading: true });
    await getDocs(collection(firestore, 'pins')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let fetchedPins = [];
      newData.forEach((p) => {
        fetchedPins.push(<Pin pinDetails={p} key={p.id} openPin={this.openPin} />);
      });
      this.setState((_state) => {
        return {
          pins: fetchedPins,
          show_modal: false,
          show_open_pin: false,
        };
      });
      // console.log(this.state.pins, newData);
      this.setState({ is_loading: false });
    });
  };

  addPin = async (pinDetails) => {
    //todo: idea --> change addPin to refreshPins, or fetchPins, as the plan is
    await this.fetchPost();
    // this.setState((_state) => {
    //   const new_pins = [..._state.pins];
    //   new_pins.push(<Pin pinDetails={pinDetails} key={_state.pins.length} openPin={this.openPin} />);
    //   return {
    //     pins: new_pins,
    //     show_modal: false,
    //     show_open_pin: false,
    //   };
    // });
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

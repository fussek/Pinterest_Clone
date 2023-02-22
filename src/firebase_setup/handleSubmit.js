import { addDoc, collection } from '@firebase/firestore';
import { firestore } from '../firebase_setup/firebase.js';
const handleSubmit = (testdata) => {
  const ref = collection(firestore, 'test_data'); // Firebase creates this automatically
  let data = {
    testData: testdata,
  };
  try {
    console.log('trying');
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};
export default handleSubmit;

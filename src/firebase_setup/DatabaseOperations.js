import { collection, doc, addDoc, getDoc, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { firestore } from '../firebase_setup/firebase.js';

export async function savePinBackend(e, users_data, imageFile) {
  let doc_snap;
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
    doc_snap = await getDoc(docRef);
    return doc_snap.data();
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function deletePinBackend(pin_details) {
  const storage = getStorage();
  const pinRef = ref(storage, pin_details.id);

  try {
    await deleteDoc(doc(firestore, 'pins', pin_details.id)).then(
      deleteObject(pinRef)
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((e) => {
          console.log('Uh-oh, an error occurred!');
        })
    );
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
}

export async function fetchPinsBackend() {
  //todo: initialize this (not working so far)
  await getDocs(collection(firestore, 'pins')).then((querySnapshot) => {
    const fetchedData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return fetchedData;
  });
}

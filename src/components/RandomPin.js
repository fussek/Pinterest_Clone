import { savePinBackend } from '../firebase_setup/DatabaseOperations.js';

const sizes = ['small', 'medium', 'large'];

export default async function RandomPin(event) {
  var random_pin = {
    author: 'Patryk',
    board: 'default',
    title: 'Random Pin',
    description: await fetch('http://metaphorpsum.com/sentences/7').then((response) => response.text()),
    destination: 'http://metaphorpsum.com/',
    pin_size: sizes[Math.floor(Math.random() * sizes.length)],
    tags: ['Random', 'Generated', 'Pin', 'Example'],
  };

  let random_img = await fetch('https://source.unsplash.com/featured/1200x1600').then((r) => r.blob());
  await savePinBackend(event, random_pin, random_img);

  return random_pin;
}

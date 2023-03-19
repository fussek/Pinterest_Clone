import { savePinBackend } from '../firebase_setup/DatabaseOperations.js';

const sizes = ['small', 'medium', 'large'];

export default async function RandomPin(event) {
  var random_pin = {
    author: 'Patryk',
    board: 'default',
    title: 'The Journey',
    description:
      'Embarking on a journey can be both exciting and daunting. The anticipation of new experiences and adventures can fill one with a sense of wonder and joy, while the uncertainty of the unknown can also bring feelings of anxiety and trepidation. Whether its a physical journey to a far-off destination or a personal journey of self-discovery, every journey has the potential to bring growth, learning, and meaningful insights into our lives.',
    destination: 'www.journey.com',
    pin_size: sizes[Math.floor(Math.random() * sizes.length)],
  };

  let random_img = await fetch('https://source.unsplash.com/featured/1200x1600').then((r) => r.blob());
  await savePinBackend(event, random_pin, random_img);

  return random_pin;
}

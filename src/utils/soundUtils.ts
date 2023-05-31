// import Sound from 'react-native-sound';

// const soundPath: { [key: string]: string } = {
//   red: require('../assets/sounds/red.mp3'),
//   green: require('../assets/sounds/green.mp3'),
//   blue: require('../assets/sounds/blue.mp3'),
//   yellow: require('../assets/sounds/yellow.mp3'),
// };

// Sound.setCategory('Playback');

// const soundUtils = {
//   playSound: (color: string) => {
//     const sound = new Sound(soundPath[color], (error) => {
//       if (error) {
//         console.log('Failed to load sound:', error);
//       } else {
//         sound.play();
//       }
//     });
//   },
// };

// export default soundUtils;


import Sound from 'react-native-sound';

const soundPath: { [key: string]: string } = {
  red: require('../assets/sounds/red.mp3'),
  green: require('../assets/sounds/green.mp3'),
  blue: require('../assets/sounds/blue.mp3'),
  yellow: require('../assets/sounds/yellow.mp3'),
};

Sound.setCategory('Playback');
const sounds: { [key: string]: Sound } = {};

const soundUtils = {
  preLoadSound: (color: string) => {
    let sound = sounds[color];
    if (!sound) {
      sound = new Sound(soundPath[color], (error) => {
        if (error)
          console.log('Failed to load sound:', error);
      });
      sounds[color] = sound;
    }
  },
  playSound: (color: string) => {
    const sound = sounds[color];
    if (sound) {
      sound.stop();
      sound.setCurrentTime(0);
      sound.play();
    }
  }
};

export default soundUtils;

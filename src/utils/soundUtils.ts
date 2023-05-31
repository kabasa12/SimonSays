import Sound from 'react-native-sound';
import redSound from '../assets/sounds/red.mp3';
import blueSound from '../assets/sounds/blue.mp3';
import greenSound from '../assets/sounds/green.mp3';
import yellowSound from '../assets/sounds/yellow.mp3';


const soundPath: { [key: string]: string } = {
  red: redSound,
  green: greenSound,
  blue: blueSound,
  yellow: yellowSound,
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

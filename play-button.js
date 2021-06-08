// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See labwork 7 writeup for more hints and details.
class PlayButton {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.button = document.querySelector('.button');
    this.playStop = this.playStop.bind(this);
    this.button.addEventListener('click', this.playStop);
  }

  playStop() {
    if (this.button.classList[1] === 'pause') {
      this.button.classList.remove('pause');
      this.button.classList.add('play');
      document.dispatchEvent(new CustomEvent('audio-pause'));
    } else if (this.button.classList[1] === 'play') {
      this.button.classList.remove('play');
      this.button.classList.add('pause');
      document.dispatchEvent(new CustomEvent('audio-play'));
    }
  }
  // TODO(you): Add methods as necessary.
}

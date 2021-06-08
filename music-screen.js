// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See labwork 7 writeup for more hints and details.
class MusicScreen {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.

    
    this.gifDisplay = new GifDisplay();
    this.playButton = new PlayButton();


    this.showNewGif = this.showNewGif.bind(this);
    this.audioPlay = this.audioPlay.bind(this);
    this.audioPause = this.audioPause.bind(this);

    this.music = document.getElementById("music");
    this.showMusicScreen = this.showMusicScreen.bind(this);
    this.playSong = this.playSong.bind(this);
    var form = document.querySelector("form");
    document.addEventListener('show-new-gif', this.showNewGif);
    form.addEventListener('submit',this.showMusicScreen);
    document.addEventListener('audio-pause', this.audioPause);
    document.addEventListener('audio-play', this.audioPlay);
    // form.addEventListener('submit',this.playMusic);
  }

  // TODO(you): Add methods as necessary.


  async showMusicScreen(event){ 
    event.preventDefault();
    try {
      var topic = document.getElementById("query-input");
      await this.gifDisplay.viewGif(topic.value);
      if (this.gifDisplay.gifUrls.length < 2) {
        throw new Error('Not enough gifs for this theme. Please try another')
      }
      this.gifDisplay.preload();
      document.getElementById('menu').classList.add('inactive');
      console.log(this.music);
      
      this.music.classList.remove('inactive');
      this.playSong();
      
      
    }catch(error) {
      console.log(error);
      document.getElementById('error').classList.remove('inactive');
    }
}


  playSong(){
      this.audioPlayer = new AudioPlayer();
      let selector = document.getElementById("song-selector");
      console.log(selector);
      let songUrl = selector.options[selector.selectedIndex].value;
      console.log(songUrl);
      this.audioPlayer.setSong(songUrl);
      this.audioPlayer.play();
      this.audioPlayer.setKickCallback(this.kick);
  }

  kick() {
    document.dispatchEvent(new CustomEvent('show-new-gif'));
  }

  showNewGif() {
    console.log(this.gifDisplay.gifList.length);
    this.gifDisplay.generateNewGif();
  }

  audioPlay() {
    this.audioPlayer.play();
  }

  audioPause() {
    this.audioPlayer.pause();
  }

}

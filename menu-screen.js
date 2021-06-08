// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See labwork 7 writeup for more hints and details.
class MenuScreen {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.

    this.selector = document.getElementById("song-selector");
    this.input = document.getElementById("query-input");
    this.menu = document.getElementById("menu");
    this.music = document.getElementById("music");
    this.themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

    this.populateSelector();
    this.initializeInputBox();
  }
  // TODO(you): Add methods as necessary.

  
  populateSelector(){
    // console.log(this.themes);
    fetch('songs.json').then(response=>{
      return response.json();  
    }).then(songs=>{
      for(const item in songs){
        var option = document.createElement("option");
        option.text = songs[item].artist + ": " + songs[item].title;
        option.value = songs[item].songUrl;
        this.selector.appendChild(option);
      }
    });
  }


  initializeInputBox(){
    var randomIndex = Math.floor(Math.random()*10);
    console.log(this.themes);
    this.input.value = this.themes[randomIndex];
    const form = document.querySelector('form');
    form.autocomplete = "off";
  }

  

}

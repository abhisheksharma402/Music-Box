// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See labwork 7 writeup for more hints and details.
class GifDisplay {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.preload = this.preload.bind(this);
    this.gifUrls = [];
    this.gifList = [];
    this.theme;
    this.i = 0;
  }
  // TODO(you): Add methods as necessary.

  async viewGif(topic) {
    // var loadScrn = document.getElementById("load");
    // loadScrn.classList.remove("inactive");
    this.theme = topic;
    this.query = encodeURIComponent(this.theme);
    this.gifPath = `https://api.giphy.com/v1/gifs/search?api_key=yCb3a2vGu9hxzySF74WnYQ9PgHS1ufbV&q=${this.query}&limit=25&offset=0&rating=G&lang=en`;

    const response = await fetch(this.gifPath);
    const jsonData = await response.json();
    if (!jsonData)
      return;
    for (let i = 0; i < jsonData.data.length; i++) {
      const url = jsonData.data[i].images.original.url;
      this.gifUrls.push(url);
    }
    // if(this.gifUrls.length < 2)
    //   loadScrn.classList.add("inactive");
    this.render();
  }

  render() {
    const gifContainerFirst = document.querySelector('#music .one');
    const gifContainerSecond = document.querySelector('#music .two');
    gifContainerFirst.style.backgroundImage = `url(${this.gifUrls[0]})`;
    gifContainerSecond.style.backgroundImage = `url(${this.gifUrls[1]})`;
  }


  generateNewGif() {
    const container = document.getElementsByClassName('gif');
    const gifShowed = document.querySelector('#music .show');
    console.log(gifShowed);
    const random = Math.floor(Math.random() * this.gifList.length);
    for (const gif of container) {
      console.log()
      if (!gif.classList.contains('show')) {
        gif.classList.add('show');
      }
    }
    gifShowed.classList.remove('show');
    gifShowed.style.backgroundImage = `url(${this.gifList[random].src})`;
  }

  preload() {
    if (this.i > 24) {
      return;
    }
    let gif = new Image();
    gif.src = this.gifUrls[this.i];
    this.gifList.push(gif);
    this.i++;
    gif.addEventListener("load", this.preload);
  }

}

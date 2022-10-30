// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Select horn from drop down menu
  let dropDown = document.getElementById('horn-select');
  console.log(dropDown);

  dropDown.addEventListener('change', (event) => {
    let horn = dropDown.value;
    let image = document.querySelector('img');

    // change the displayed image 
    image.src = `assets/images/${horn}.svg`;

    // change the audio file of the horn
    let audio = document.getElementsByClassName('hidden')[0];
    audio.src = `assets/audio/${horn}.mp3`;
  })


  // Change volume from slider
  let volSlider = document.getElementById('volume');

  volSlider.addEventListener('change', (event) => {

    let vol = volSlider.value;
    let icon = document.querySelector('#volume-controls img')

    //mute icon when 0 volume
    if (vol == 0) {
      icon.src = `assets/icons/volume-level-0.svg`;
    } else if (vol < 33) {
      icon.src = `assets/icons/volume-level-1.svg`;
    } else if (vol < 67) {
      icon.src = `assets/icons/volume-level-2.svg`;
    } else {
      icon.src = `assets/icons/volume-level-3.svg`;
    }

    // set corresponding volume of the audio element
    let audio = document.querySelector('.hidden');
    audio.volume = vol / 100;
    console.log(audio);
    console.log(audio.volume);
  })

  // Play sound when button is presed and confettis
  let playButton = document.querySelector('button');

  playButton.addEventListener('click', (event) => {
    let audio = document.querySelector('.hidden');
    // no sound is played if there is no 
    if (audio.src == '') {
      return
    }

    // can't figure out another way to play audio
    const sound = new Audio(audio.src);
    sound.volume = audio.volume;
    sound.play();


    // Confettis
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiRadius: 20,
      confettiNumber: 500,
    });

  })




}
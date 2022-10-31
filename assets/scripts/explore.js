// explore.js
window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;

  let textBox = document.querySelector('#text-to-speak');
  let voiceSelect = document.querySelector('#voice-select');
  let talkButton = document.querySelector('button');

  // array of voices available
  let voices = synth.getVoices();

  // populate list of options
  populateVoiceList(voices, voiceSelect);


  voiceSelect.addEventListener('change', (event) => {
    let chosenVoice = voiceSelect.options[voiceSelect.selectedIndex];

    voiceSelect.setAttribute('chosen-lang', chosenVoice.getAttribute('d-lang'));
    voiceSelect.setAttribute('chosen-name', chosenVoice.getAttribute('d-name'));

  })


  talkButton.addEventListener('click', (event) => {

    const utterThis = new SpeechSynthesisUtterance(textBox.value);
    const chosenVoiceName = voiceSelect.getAttribute('chosen-name');
    const faceImage = document.querySelector('img');

    // set the correct voice
    for (const voice of voices) {
      if (voice.name === chosenVoiceName) {
        utterThis.voice = voice;
      }
    }

    // open mouth
    utterThis.addEventListener('start', (event) => {
      faceImage.src = 'assets/images/smiling-open.png';
    })

    // close mouth
    utterThis.addEventListener('end', (event) => {
      faceImage.src = 'assets/images/smiling.png';
    })

    synth.speak(utterThis);
  })


}

function populateVoiceList(voices, voiceSelect) {
  // for each voice, make an option associated under the select
  for (const voice of voices) {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute('d-lang', voice.lang);
    option.setAttribute('d-name', voice.name);
    voiceSelect.appendChild(option);


  }
}
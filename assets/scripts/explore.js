// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // load voices
  let synth = window.speechSynthesis;
  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();
    let voiceSelect = document.getElementById("voice-select");
    voiceSelect.innerHTML = "";

    // Add the "Select Voice" option to the dropdown
    let defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select Voice:';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    voiceSelect.appendChild(defaultOption);
    
    // add options for each voice
    voices.forEach((voice, i) => {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = voice.name + " (" + voice.lang + ")";
      voiceSelect.appendChild(option);
    });
  }

  populateVoiceList();
  // update browser supported voices
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }

  // button clicked -> speak && change image
  let speakButton = document.querySelector("button");
  speakButton.addEventListener("click", function(event) {
    event.preventDefault();
    let text = document.getElementById("text-to-speak").value;
    let selectedVoice = document.getElementById("voice-select").value;

    if (text !== "") {
      let utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[selectedVoice];
      synth.speak(utterance);
      
      let faceImage = document.querySelector("img");
      faceImage.setAttribute("src", "assets/images/smiling-open.png");

      utterance.onend = function() {
        faceImage.setAttribute("src", "assets/images/smiling.png");
      }
    }
  });
}
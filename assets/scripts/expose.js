// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // horns
  const horns = {
    "air-horn": {
      image: "assets/images/air-horn.svg",
      audio: "assets/audio/air-horn.mp3"
    },
    "car-horn": {
      image: "assets/images/car-horn.svg",
      audio: "assets/audio/car-horn.mp3"
    },
    "party-horn": {
      image: "assets/images/party-horn.svg",
      audio: "assets/audio/party-horn.mp3"
    }
  };

  // change event
  const hornSelect = document.getElementById("horn-select");
  const image = document.querySelector("section img");
  const audio = document.querySelector("section audio");
  hornSelect.addEventListener("change", () => {
    const horn = horns[hornSelect.value];
    image.src = horn.image;
    audio.src = horn.audio;
  });

  // volume
  const volume = document.getElementById("volume");
  const volumeIcon = document.querySelector("section #volume-controls img");
  audio.volume = volume.value / 100; // set initial volume level
  volume.addEventListener("input", () => {
    const volumeLevel = volume.value / 100;
    audio.volume = volumeLevel;
    if (volumeLevel === 0) {
      volumeIcon.src = "assets/icons/volume-level-0.svg";
      volumeIcon.alt = "Volume level 0";
    } else if (volumeLevel < 0.33) {
      volumeIcon.src = "assets/icons/volume-level-1.svg";
      volumeIcon.alt = "Volume level 1";
    } else if (volumeLevel < 0.67) {
      volumeIcon.src = "assets/icons/volume-level-2.svg";
      volumeIcon.alt = "Volume level 2";
    } else {
      volumeIcon.src = "assets/icons/volume-level-3.svg";
      volumeIcon.alt = "Volume level 3";
    }
  });

  // Sound button and party effect
  const playButton = document.querySelector("section button");
  const jsConfetti = new jsConfetti();
  playButton.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
    if (hornSelect.value === "party-horn") {
      jsConfetti.addConfetti();
    }
  });
}
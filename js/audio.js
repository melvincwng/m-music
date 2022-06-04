// This script only allows 1 audio to be played at any time (prevent multiple audios from being played)

const audios = document.querySelectorAll("audio");

for (const audio of audios) {
  audio.addEventListener("play", stopOtherAudios);
}

function stopOtherAudios(event) {
  for (const audio of audios) {
    if (audio !== event.target) {
      audio.pause();
    }
  }
}

// This script also adds a padding-right of 16px for each music element ONLY IN desktop view.
// And removes that 16px padding-right in mobile view

function isMobileView() {
  const mobileViewRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  if (mobileViewRegex.test(navigator.userAgent)) {
    return true;
  }
}

function addPaddingInDesktop() {
  const musicElements = document.querySelectorAll(".musicElement");

  for (const musicElement of musicElements) {
    isMobileView()
      ? musicElement.classList.remove("addPadding")
      : musicElement.classList.add("addPadding");
  }
}

addPaddingInDesktop();

setInterval(() => {
  addPaddingInDesktop();
}, 100);

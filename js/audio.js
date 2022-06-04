// This part of the script grabs all the musicDetails stored in localStorage (if any), which is in string format
// Then, we split that string from localStorage by the "---(NEXT_MUSIC)---" separator which we added earlier
// To get an array of individual musics (listOfMusics)
let listOfMusics =
  window.localStorage.getItem("musicDetails")?.split("---(NEXT_MUSIC)---") ||
  [];

// A function written to display the music from localStorage
function displayMusics() {
  const musicBody = document.getElementById("musicBody");
  let musicBodyInnerHTML = "";

  for (let i = 0; i < listOfMusics.length; i++) {
    let music = decodeURIComponent(listOfMusics[i]);
    const individualMusicDetailArray = music.split("---(SPACING)---");
    let formattedArray = [];
    let tooltipString = "";

    for (let musicDetail of individualMusicDetailArray) {
      musicDetail = musicDetail.replace("musicTitle=", "Title: ");
      musicDetail = musicDetail.replace("musicGenre=", "Genre: ");
      musicDetail = musicDetail.replace("musicArtist=", "Artist: ");
      musicDetail = musicDetail.replace("musicRelease=", "Release: ");
      musicDetail = musicDetail.replace("musicDuration=", "Duration: ");
      musicDetail = musicDetail.replace("musicURL=", "URL: ");
      musicDetail = musicDetail.replace("musicDescription=", "Description: ");
      musicDetail = musicDetail.replaceAll("+", " ");
      formattedArray.push(musicDetail);
    }

    for (formattedMusicDetail of formattedArray) {
      tooltipString += formattedMusicDetail + "\n";
    }

    musicBodyInnerHTML += `
    <div style="display: flex; flex-direction: column" class="musicElement">
      <img
        src="./img/defaultImage.png"
        style="width: 275px; height: 275px"
        alt="Music Image"
        title="${tooltipString}"
      />
    `;

    for (let i = 0; i < formattedArray.length; i++) {
      /* 
        Advanced feature for Assignment 1:
        Use DOMPurify library to sanitize any dirty user inputs as prevention of XSS
        E.g. <img src=a onerror=alert('XSS')> -> adding this as part of .innerHTML will trigger XSS!
      */
      let sanitizedMusicDetail = DOMPurify.sanitize(formattedArray[i]);
      let sanitizedMusicDetailKey = sanitizedMusicDetail.split(":")[0];
      let sanitizedMusicDetailValue = sanitizedMusicDetail.split(":")[1];

      switch (sanitizedMusicDetailKey) {
        case "Title":
          musicBodyInnerHTML += `
            <p 
              style="font-size: 13px; margin: 0px 0px 2px"
              >
                ${sanitizedMusicDetailValue}
            </p>`;
          break;
        case "Artist":
          musicBodyInnerHTML += `
            <p
              style="
              font-size: 11px;
              color: #747474 !important;
              margin: 0px 0px 4px;"
            >
              ${sanitizedMusicDetailValue}
            </p>
          `;
          break;
        case "URL":
          const indexOfPeriod = sanitizedMusicDetail.indexOf(":");
          const sanitizedURL = sanitizedMusicDetail.slice(indexOfPeriod + 1);
          musicBodyInnerHTML += `
            <audio controls>
              <source
                src="${sanitizedURL}"
                type="audio/mpeg"
              />
              <source
                src="${sanitizedURL}"
                type="audio/ogg"
              />
              <source
                src="${sanitizedURL}"
                type="audio/wav"
              />
              Your browser does not support the audio tag.
            </audio>
          `;
          break;
        default:
          break;
      }
    }

    musicBodyInnerHTML += `</div>`;
  }

  musicBody.innerHTML = musicBodyInnerHTML;
}

// If listOfMusics is not an empty array => then we display the musics in the homepage
listOfMusics.length && displayMusics();

// This part of the script only allows 1 audio to be played at any time (prevent multiple audios from being played)
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

// This part of the script also adds a padding-right of 16px for each music element ONLY IN desktop view.
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

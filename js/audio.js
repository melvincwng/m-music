// Part 1:
// This part of the script grabs all the musicDetails stored in localStorage (if any), which is in string format
// Then, we split that string from localStorage by the "---(NEXT_MUSIC)---" separator which we added earlier
// To get an array of individual musics (listOfMusics)
// However, due to the deletion mechanism that's implemented, it was noticed there were leftover "---(NEXT_MUSIC)---" strings that can be present in localStorage
// This means that after we split that string to get the listOfMusics array...take note each element in that array can either be a A) valid music element OR B) '' empty string
// Hence, after retrieval from localStorage, we then need to filter the elements in that array and only return those which are actual music elements
// Or else, you will notice empty divs with padding-right: 16px when you delete some of the songs (caused by the empty string '' music elements), which doesn't look good in the UI side
let listOfMusics =
  window.localStorage.getItem("musicDetails")?.split("---(NEXT_MUSIC)---") ||
  [];
listOfMusics = listOfMusics.filter((musicElement) => musicElement !== "");

// Part 2:
// A function written to display the music from localStorage
function displayMusics() {
  const musicBody = document.getElementById("musicBody");
  let musicBodyInnerHTML = "";

  for (let i = 0; i < listOfMusics.length; i++) {
    let music = decodeURIComponent(listOfMusics[i]);
    const individualMusicDetailArray = music.split("---(SPACING)---");
    let formattedArray = [];
    let tooltipString = "";
    let musicID = i + 1;

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
    `;

    for (let j = 0; j < formattedArray.length; j++) {
      /* 
        Advanced feature for Assignment 1:
        Use DOMPurify library to sanitize any dirty user inputs as prevention of XSS
        E.g. <img src=a onerror=alert('XSS')> -> adding this as part of .innerHTML will trigger XSS!
      */
      let sanitizedMusicDetail = DOMPurify.sanitize(formattedArray[j]);
      let sanitizedMusicDetailKey = sanitizedMusicDetail.split(":")[0];
      let sanitizedMusicDetailValue = sanitizedMusicDetail.split(":")[1];

      switch (sanitizedMusicDetailKey) {
        case "Title":
          musicBodyInnerHTML += `
            <img
              src="./img/defaultImage.png"
              style="width: 275px; height: 275px"
              alt="Music Image"
              title="${tooltipString}"
              class="musicImage"
            />
            <div style="display: flex; justify-content: space-between">
              <div>
                <p 
                  style="font-size: 13px; margin: 0px 0px 2px"
                  >
                    ${sanitizedMusicDetailValue}
                </p>
            `;
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
              </div>
              <div>
                <img src="./img/deleteIcon.svg" alt="Delete Symbol" width="32px" height="32px" style="cursor:pointer" onclick="deleteSelectedMusic(event)" id="${musicID}">
              </div>
            </div>
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

// Part 3:
// If listOfMusics is not an empty array => then we display the musics in the homepage
listOfMusics.length && displayMusics();

// Part 4:
// A function written to delete the selected music
function deleteSelectedMusic(event) {
  const deletedMusicId = parseInt(event.target.id);

  // Appends an id temporarily to each music element in the original listOfMusics array
  let modifiedListOfMusics = listOfMusics.map(
    (music, index) => (music += `---(SPACING)---id=${index + 1}`)
  );

  // Find out what is the music element that's about to be deleted
  let deletedMusic = modifiedListOfMusics
    .find((music) => music.includes(`id=${deletedMusicId}`))
    .replace(`---(SPACING)---id=${deletedMusicId}`, "");

  // If removing the last music/song in the localStorage, it will not have a ---(NEXT_MUSIC)--- appended
  // The other songs (other than the last one) will have that ---(NEXT_MUSIC)--- string appended
  // Hence, need this filtering condition for the deletion of music logic to work properly
  deletedMusic =
    deletedMusicId === listOfMusics.length
      ? deletedMusic
      : deletedMusic + "---(NEXT_MUSIC)---";

  // Remove the music which user clicked to delete
  let newMusicDetails = localStorage
    .getItem("musicDetails")
    .replace(deletedMusic, "");

  // Save the new music details (which saves the removal of the deleted music)
  localStorage.setItem("musicDetails", newMusicDetails);

  // Alert the user that the song is deleted and then refresh the page
  alert("Music deleted 🗑️!");
  window.location.href = "./index.html";
}

// Part 5:
// A function to reset music body in index.html
// If there are no music stored in localStorage, we then need to "reset" musicBody (a div container)'s innerHTML to show 'Empty' string
function resetMusicBody() {
  document.getElementById("musicBody").innerHTML = "Empty";
  localStorage.removeItem("musicDetails");
}

// Part 6:
// A utility function that checks whether localStorage contains any music
// If it does not, localStorage will either return a) null OR b) '---(NEXT_MUSIC)---' leftover strings (this happens when you add the same song multiple times & then remove it)
function localStorageHasNoMusic() {
  const storedDetails = localStorage.getItem("musicDetails");

  if (!storedDetails) {
    // No details stored in localStorage
    return true;
  } else {
    // Got details stored in localStorage:
    //    - A) Can be valid music details OR
    //    - b) Leftover ---(NEXT_MUSIC)--- strings aka invalid/no music
    const splitArray = storedDetails.split("---(NEXT_MUSIC)---");
    const rejoinedMusicString = splitArray.join("");

    // If it's A) ---> the rejoinedMusicString will not be an empty string
    // If it's B) ---> after splitting the string, we will get an array of only empty strings. Hence when rejoin back, we get back empty string.
    if (!rejoinedMusicString) return true;
  }
}

localStorageHasNoMusic() && resetMusicBody();

// Part 7:
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

// Part 8:
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

const atProcessPage = window.location.pathname
  .split("/")
  .includes("process.html");
let queryString = window.location.search.substring(1);

// A function written to save music details when admin user is at process.html page after being redirected from the addMusic.html
function saveMusicDetails() {
  let newMusicDetails = queryString.split("&");
  let modifiedMusicDetails = [];

  for (let i = 0; i < newMusicDetails.length; i++) {
    // add spacing for all music details, except the last one ('Description')
    if (i < newMusicDetails.length - 1) {
      newMusicDetails[i] += "---(SPACING)---";
    }
    modifiedMusicDetails.push(newMusicDetails[i]);
  }

  // check localStorage if musicDetails already exists:
  let musicDetails = window.localStorage.getItem("musicDetails");

  // if musicDetails already exists in localStorage, add new music details to it, spaced apart by a separator. Else use the value by itself.
  musicDetails = musicDetails
    ? musicDetails + "---(NEXT_MUSIC)---" + modifiedMusicDetails.join("")
    : modifiedMusicDetails.join("");

  // localStorage stores values in "string" form only (cannot store array) ---> we will store a string containing something like "firstMusicDetails---(NEXT_MUSIC)---secondMusicDetails---(NEXT_MUSIC)---thirdMusicDetails---..." etc
  window.localStorage.setItem("musicDetails", musicDetails);
}

// If at the process.html page, and there is query string => then we save the music details into localStorage
atProcessPage && queryString && saveMusicDetails();

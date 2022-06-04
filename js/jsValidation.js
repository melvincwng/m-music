// To contain logic for validation checks when validating the 'Add Music' form in addMusic.html page
function validateMusicDetails(event) {
  alert("Validating user data...");

  const musicTitle = document.getElementById("musicTitle").value.trim();
  const musicGenre = document.getElementById("musicGenre").value.trim();
  const musicArtist = document.getElementById("musicArtist").value.trim();
  const musicRelease_Yes = document.getElementById("musicRelease_Yes");
  const musicRelease_No = document.getElementById("musicRelease_No");
  let musicDuration = document.getElementById("musicDuration").value.trim();
  const musicURL = document.getElementById("musicURL").value.trim();
  const musicDescription = document
    .getElementById("musicDescription")
    .value.trim();
  const errorMessage = document.getElementById("divMessage");
  const isAtLeastOneRadioButtonChecked =
    musicRelease_Yes.checked || musicRelease_No.checked;
  const musicDetailsArray = [
    musicTitle,
    musicGenre,
    musicArtist,
    isAtLeastOneRadioButtonChecked,
    musicDuration,
    musicURL,
    musicDescription,
  ];

  /* Validation checks (Pseudo-code):
      1. All fields cannot be empty
      2. musicGenre cannot be an invalid music type
      3. musicDuration:
          a) cannot contain alphabets or special characters (aka must be a NUMBER), and
          b) must be only up to 2 decimal places, and
          c) can only be in this format (10.00, or 10.35, not 10.1, not 10..00, not 10.)
      4. Additional validation checks (extra)
  */

  // 1) Validation check to check if there are any empty fields
  const anyEmptyFields =
    !musicTitle ||
    !musicGenre ||
    !musicArtist ||
    !isAtLeastOneRadioButtonChecked ||
    !musicDuration ||
    !musicURL ||
    !musicDescription;

  // 2) Validation check to check for 'invalid' music genres
  const invalidMusicGenre = musicGenre === "invalid";

  // 3) Validation check to check whether music duration is of the correct format (min.ss) (e.g. 12.30 --> 12min 30sec)
  let musicDurationValidFormat, secondsCorrectFormat;
  const musicDurationNumber = musicDuration !== "" && !isNaN(musicDuration);
  if (musicDurationNumber) {
    const indexOfDotSymbol = musicDuration.indexOf(".");

    if (indexOfDotSymbol === -1) {
      // means musicDuration is a whole number (e.g. 15)
      musicDurationValidFormat = true;
    } else {
      // means musicDuration is in decimal format (e.g. 15.1, 15.10, 15.100 - basically either a) One dp, b) Two dp or c) Three or more dp)
      const splitArray = musicDuration.split(".");
      const seconds = splitArray[1];

      // check seconds are in correct format (ss -> e.g. 58 is OK, but not 5 or 500 aka 1dp & 3 dp NOT ALLOWED, but 2dp ALLOWD)
      if (seconds.length === 2) {
        secondsCorrectFormat = true;
      }

      // now check if seconds are < 60 (e.g. 59, 35 is OK. But NOT 61, 99)
      if (secondsCorrectFormat) {
        const secondsInTypeNumber = parseInt(seconds);
        if (secondsInTypeNumber < 60) {
          musicDurationValidFormat = true;
        }
      }
    }
  }

  // 4a) A another validation check to check if musicURL is a valid link/URL (using regex)
  // This regex checks if the image URL optionally starts with http/https: and '://', subdomain can be anything, domain name of 2-256 chars, and top level domain e.g. .com/.org etc of 2-6 chars
  const validURLRegex = new RegExp(
    "((http|https)://)?" +
      "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
      "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)",
    "i"
  );

  // 4b) A regex to check if the URL's last few characters matches that of a audio file extension
  // Reference: https://en.wikipedia.org/wiki/Audio_file_format (for full list of all possible audio file extensions)
  const containsAudioFileExtensionRegex = new RegExp(
    /\.(?:wav|mp3|ogg|3gp|aa|aac|aax|act|aiff|alac|amr|ape|au|awb|dss|dvf|flac|gsm|iklax|ivs|m4a|m4b|m4p|mmf|mpc|nmf|oga|mogg|opus|raw|ra|rm|rf64|sln|tta|voc|vox|wma|webm|8svx|cda)$/i
  );

  const musicURLValid =
    validURLRegex.test(musicURL) &&
    containsAudioFileExtensionRegex.test(musicURL);

  if (
    !anyEmptyFields &&
    !invalidMusicGenre &&
    musicDurationValidFormat &&
    musicURLValid
  ) {
    // Music details passes all validation checks & user will be redirected to process.html page
    alert(
      "Passed all validation checks ✔️! \nPlease wait while we add this music to your local storage 😊"
    );
  } else {
    // Music details fail one or more validation checks
    // Populate div with error messages using JS and make them appear
    // And prevent user from being redirected... Only redirect once they edited the data and data passes all validation checks
    event.preventDefault();
    alert(
      "Failed validation checks ❌! \nPlease see error message(s) at the bottom of the form!"
    );

    const titleErrorMessage =
      "<div id='titleErrorMessage'>• Title of music is required.</div>";
    const genreErrorMessage =
      "<div id='genreErrorMessage'>• Genre of music is required.</div>";
    const artistErrorMessage =
      "<div id='artistErrorMessage'>• Artist of music is required.</div>";
    const releaseErrorMessage =
      "<div id='releaseErrorMessage'>• Release status of music is required.</div>";
    const durationErrorMessage =
      "<div id='durationErrorMessage1'>• Duration of music is required.</div>";
    const musicURLErrorMessage =
      "<div id='musicURLErrorMessage'>• Music URL is required.</div>";
    const descriptionErrorMessage =
      "<div id='descriptionErrorMessage'>• Description of music is required.</div>";
    const invalidErrorMessage =
      "<div id='genreErrorMessage'>• Genre must be valid during submission.</div>";
    const musicDurationInvalidFormatErrorMessage =
      "<div id='durationErrorMessage2'>• Duration of music is in an invalid format.</div>";
    const musicURLInvalidErrorMessage =
      "<div id='musicURLInvalidErrorMessage'>• Music URL is not a valid URL!</div>";

    let finalErrorMessage = "";

    const errorMessageObject = {
      0: titleErrorMessage,
      1: genreErrorMessage,
      2: artistErrorMessage,
      3: releaseErrorMessage,
      4: durationErrorMessage,
      5: musicURLErrorMessage,
      6: descriptionErrorMessage,
      7: invalidErrorMessage,
    };

    if (anyEmptyFields || invalidMusicGenre) {
      for (let i = 0; i < musicDetailsArray.length; i++) {
        // In that array containing music details (for one music) -> we loop through each detail
        // And if the detail is falsy (contains empty string "" or false boolean) -> append the respective error message to finalErrorMessage
        // This is for index 0 to 6 (in the errorMessageObject)
        if (!musicDetailsArray[i]) {
          finalErrorMessage += errorMessageObject[i];
        }

        // In the musicDetailsArray, 'musicGenre' is at index 1, and it's value can also be an "invalid" string.
        // If so, add the corresponding error message to finalErrorMessage
        // This is for index 7 of the errorMessageObject
        if (i === 1 && musicDetailsArray[i] === "invalid") {
          finalErrorMessage += errorMessageObject[7];
        }
      }
    }

    if (!musicDurationValidFormat)
      finalErrorMessage += musicDurationInvalidFormatErrorMessage;

    if (!musicURLValid) finalErrorMessage += musicURLInvalidErrorMessage;

    errorMessage.innerHTML = finalErrorMessage;

    // The logic of this utility function is found in removeErrorMessages.js
    addEventListenersToRemoveErrorMsg();
  }
}

/* 
  'Input' event should work for both desktop and mobile view
  Add event listeners to hide error message(s) as user rectifies the error(s)
*/

function addEventListenersToRemoveErrorMsg() {
  musicTitle.addEventListener("input", function () {
    const individualErrorMessage = document.getElementById("titleErrorMessage");
    if (individualErrorMessage) individualErrorMessage.remove();
  });
  musicGenre.addEventListener("input", function () {
    const individualErrorMessage = document.getElementById("genreErrorMessage");
    if (individualErrorMessage) individualErrorMessage.remove();
  });
  musicArtist.addEventListener("input", function () {
    const individualErrorMessage =
      document.getElementById("artistErrorMessage");
    if (individualErrorMessage) individualErrorMessage.remove();
  });
  musicRelease_Yes.addEventListener("input", function () {
    const individualErrorMessage = document.getElementById(
      "releaseErrorMessage"
    );
    if (individualErrorMessage) individualErrorMessage.remove();
  });
  musicRelease_No.addEventListener("input", function () {
    const individualErrorMessage = document.getElementById(
      "releaseErrorMessage"
    );
    if (individualErrorMessage) individualErrorMessage.remove();
  });
  musicDuration.addEventListener("input", function () {
    const durationErrorMessage1 = document.getElementById(
      "durationErrorMessage1"
    );
    if (durationErrorMessage1) durationErrorMessage1.remove();

    const durationErrorMessage2 = document.getElementById(
      "durationErrorMessage2"
    );
    if (durationErrorMessage2) durationErrorMessage2.remove();
  });
  musicURL.addEventListener("input", function () {
    const musicURLErrorMessage1 = document.getElementById(
      "musicURLErrorMessage"
    );
    if (musicURLErrorMessage1) musicURLErrorMessage1.remove();

    const musicURLErrorMessage2 = document.getElementById(
      "musicURLInvalidErrorMessage"
    );
    if (musicURLErrorMessage2) musicURLErrorMessage2.remove();
  });
  musicDescription.addEventListener("input", function () {
    const individualErrorMessage = document.getElementById(
      "descriptionErrorMessage"
    );
    if (individualErrorMessage) individualErrorMessage.remove();
  });
}

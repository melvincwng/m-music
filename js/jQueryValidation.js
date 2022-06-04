// This anonymous jQuery function will only run when the DOM is fully loaded

$(function () {
  /*
    This block of code/function basically makes the textboxes become highlighted with yellow color, if those fields have a) missing data or b) fail the validation criterias/checks
  */
  $("#btnSubmit").on("click", function () {
    const titleFieldHasError = $("#titleErrorMessage").length;
    const genreFieldHasError = $("#genreErrorMessage").length;
    const artistFieldHasError = $("#artistErrorMessage").length;
    const releaseFieldHasError = $("#releaseErrorMessage").length;
    const durationFieldHasError =
      $("#durationErrorMessage1").length || $("#durationErrorMessage2").length;
    const musicURLFieldHasError =
      $("#musicURLErrorMessage").length ||
      $("#musicURLForbiddenCharsErrorMessage").length ||
      $("#musicURLInvalidErrorMessage").length;
    const descriptionFieldHasError = $("#descriptionErrorMessage").length;

    if (titleFieldHasError) {
      $("#musicTitle").css("background-color", "yellow");
    } else {
      $("#musicTitle").css("background-color", "white");
    }

    if (genreFieldHasError) {
      $("#musicGenre").css("background-color", "yellow");
    } else {
      $("#musicGenre").css("background-color", "white");
    }

    if (artistFieldHasError) {
      $("#musicArtist").css("background-color", "yellow");
    } else {
      $("#musicArtist").css("background-color", "white");
    }

    if (releaseFieldHasError) {
      $("#releaseField").css("background-color", "yellow");
    } else {
      $("#releaseField").css("background-color", "snow");
    }

    if (durationFieldHasError) {
      $("#musicDuration").css("background-color", "yellow");
    } else {
      $("#musicDuration").css("background-color", "white");
    }

    if (musicURLFieldHasError) {
      $("#musicURL").css("background-color", "yellow");
    } else {
      $("#musicURL").css("background-color", "white");
    }

    if (descriptionFieldHasError) {
      $("#musicDescription").css("background-color", "yellow");
    } else {
      $("#musicDescription").css("background-color", "white");
    }
  });

  /*
    This block of code basically "resets" the textboxes to their original default color,
    once the user has amended/typed in those fields
  */
  $("#musicTitle").on("input", function () {
    $("#musicTitle").css("background-color", "white");
  });

  $("#musicGenre").on("input", function () {
    $("#musicGenre").css("background-color", "white");
  });

  $("#musicArtist").on("input", function () {
    $("#musicArtist").css("background-color", "white");
  });

  $("#releaseField").on("input", function () {
    $("#releaseField").css("background-color", "snow");
  });

  $("#musicDuration").on("input", function () {
    $("#musicDuration").css("background-color", "white");
  });

  $("#musicURL").on("input", function () {
    $("#musicURL").css("background-color", "white");
  });

  $("#musicDescription").on("input", function () {
    $("#musicDescription").css("background-color", "white");
  });

  /*
    As the user types in the 'Description' textarea, this function will run to update the number of characters typed so far
    If currentLength = 0, meaning no words typed in the textarea, the displayMessage is hidden/empty
    Else, we display the displayMessage
    If user types 250 characters ---> an alert message will be shown to inform user that he/she reached the character limit already
  */
  $("#musicDescription").on("input", function () {
    let currentLength = $(this).val().length;
    const displayMessage =
      currentLength === 250
        ? `Number of characters typed: <b id="maxCharactersLimitReached">${currentLength}</b>`
        : currentLength
        ? `Number of characters typed: ${currentLength}`
        : "";
    $("#numberOfCharacters").html(displayMessage);

    if (currentLength === 250)
      alert("Maximum number of 250 characters reached!");
  });
});

window.onload = function () {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported.");
  } else {
    navigator.serviceWorker
      .register("sw.js")
      .then(function () {
        console.log("Registered Service Worker.");
      })
      .catch(function () {
        console.log("Failure in Registering Service Worker.");
      });
  }
};

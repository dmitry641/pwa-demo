self.addEventListener("install", () => {
  console.log("service worker - install");
});
self.addEventListener("activate", () => {
  console.log("service worker - activate");
});

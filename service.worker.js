const cacheName = "TorstenKnaufV1";
const pathnamesToCache = [
  "/",
  "/index.html",
  "/assets/appIcon.png",
  "/assets/applicationPhoto.jpg",
  "/assets/favicon.ico",
  "/assets/QRCodeToWebPage.svg",
  "/css/browserReset.css",
  "/css/styles.css",
  "/css/styles.desktop.css",
  "/css/styles.print.css",
  "/src/applicationPhoto.component.js",
  "/src/contentEntry.component.js",
  "/src/contentSection.component.js",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(pathnamesToCache))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin && pathnamesToCache.includes(url.pathname)) {
    return event.respondWith(replyToPathnameFromCache(url.pathname, event.request));
  }


  async function replyToPathnameFromCache(pathname, request) {
    const cachedResponse = await caches.match(pathname);
    if (cachedResponse !== undefined) {
      return cachedResponse;
    }

    const response = await fetch(request);
    const clonedResponse = response.clone();
    caches.open(cacheName).then(cache => cache.put(pathname, clonedResponse)); // don't await to response as fast as possible to the user
    return response;
  }
});

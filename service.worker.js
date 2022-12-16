const cacheName = "TorstenKnaufV1.0.1";
const previousVersionCacheName = "TorstenKnaufV1";
const pathnamesToCache = [
  "/app.webmanifest",
  "/",
  "/index.html",
  "/assets/applicationPhoto.jpg",
  "/assets/favicon.ico",
  "/assets/QRCodeToWebPage.svg",
  "/assets/splashScreen.png",
  "/css/browserReset.css",
  "/css/styles.css",
  "/css/styles.desktop.css",
  "/css/styles.print.css",
  "/src/applicationPhoto.component.js",
  "/src/contentEntry.component.js",
  "/src/contentSection.component.js",
];

self.addEventListener("install", event => {
  fillCache(event);
  // This force update is fine, as we only have a static pwa.
  // Otherwise we should implement a more sophisticated approach.
  // See e.g. https://whatwebcando.today/articles/handling-service-worker-updates
  self.skipWaiting(); 

  function fillCache(event) {
    const urlOfSelf = event.target.serviceWorker.scriptURL;
    const isOnGitHubPages = urlOfSelf.includes("github.io");
    const servedPathnamesToCache = isOnGitHubPages
      ? ["/curriculum-vitae", ...pathnamesToCache.map(p => "/curriculum-vitae" + p)]
      : pathnamesToCache;
    event.waitUntil(Promise.all([
      caches.delete(previousVersionCacheName),
      caches.open(cacheName).then(cache => cache.addAll(servedPathnamesToCache))
    ]));
  }
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin && pathnamesToCache.includes(url.pathname)) {
    return event.respondWith(replyFromCache(url.pathname, event.request));
  }

  async function replyFromCache(pathname, request) {
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

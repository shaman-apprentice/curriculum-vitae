const cacheName = "TorstenKnaufV1.1.0";
const previousVersionCacheName = "TorstenKnaufV1.0.2";
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
  "/css/theme.css",
  "/css/theme-switcher.css",
  "/src/applicationPhoto.component.js",
  "/src/contentEntry.component.js",
  "/src/contentSection.component.js",
];
const basePath = location.host.includes("github.io") ? "/curriculum-vitae" : "";
const servedPathnamesToCache = pathnamesToCache.map(path => basePath + path);

self.addEventListener("install", event => {
  fillCache(event);
  // This force update is fine, as we only have a static pwa.
  // Otherwise we should implement a more sophisticated approach.
  // See e.g. https://whatwebcando.today/articles/handling-service-worker-updates
  self.skipWaiting(); 

  function fillCache(event) {
    event.waitUntil(Promise.all([
      caches.delete(previousVersionCacheName),
      caches.open(cacheName).then(cache => cache.addAll(servedPathnamesToCache))
    ]));
  }
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin && servedPathnamesToCache.includes(url.pathname)) {
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

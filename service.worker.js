// Version 1.2.2 - update version to ensure service worker is bitwise different than previous one and it gets reinstalled leading to cache update in installation script
const cacheName = "CurriculumVitaTorstenKnauf";
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
  // Force update to immediately present latest version.
  // See https://whatwebcando.today/articles/handling-service-worker-updates for more sophisticated approaches
  self.skipWaiting(); 

  function fillCache(event) {
    event.waitUntil(caches.delete(cacheName)
      .then(() => caches.open(cacheName))
      .then(cache => cache.addAll(servedPathnamesToCache))
    );
  }
});

self.addEventListener('activate', async () => {
  const openedTabs = await self.clients.matchAll({type: 'window'})
  openedTabs.forEach((tab) => {
    tab.navigate(tab.url) // reload to ensure cached files weren't already served before activation
  })
})

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

/// <reference lib="webworker" />

/** Only goal of service-worker is offline support (cache of assets) for PWA */

const sw = /**@type {ServiceWorkerGlobalScope}*/ (/**@type {unknown}*/ (self));

const CACHE_VERSION = "v1";
const CACHE_NAME = `cv-ts-cache-${CACHE_VERSION}`;
const CACHE_URLS = [
  "./",
  "./index.html",
  "./app.webmanifest",

  "./styles/index.css",
  "./styles/theme-switch.css",
  "./styles/layout.large.css",
  "./styles/layout.small.css",
  "./styles/print.css",
  "./styles/theme.css",

  "./assets/favicon.ico",
  "./assets/application-photo.jpg",
  "./assets/app-icon.png",
  "./assets/splashscreen.png",
];

sw.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CACHE_URLS);
      await sw.skipWaiting();
    })(),
  );
});

sw.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("cv-ts-cache-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );

      await sw.clients.claim();
    })(),
  );
});

sw.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET")
    return;

  const url = new URL(request.url);
  if (url.origin !== sw.location.origin)
    return;

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(new Request(request, { cache: "no-store" }));
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(request);
        if (cached)
          return cached;
        throw new Error("Network request failed and no cached response is available.");
      }
    })(),
  );
});

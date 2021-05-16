const staticCacheName = "static-app-v2";
const dynamicCacheName = "dynamic-app-v2";
const assetUrls = ["index.html", "index.js", "style.css", "offline.html"];

self.addEventListener("install", async (e) => {
  // e.waitUntil(
  //   caches.open(staticCacheName).then((cache) => cache.addAll(assetUrls))
  // );
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
});
self.addEventListener("activate", async () => {
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((n) => n !== staticCacheName)
      .filter((n) => n !== dynamicCacheName)
      .map((n) => caches.delete(n))
  );
});
self.addEventListener("fetch", (e) => {
  console.log("fetch", e.request.url);

  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(e.request));
  } else {
    e.respondWith(networkFirst(e.request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const res = await fetch(request);
    cache.put(request, res.clone());
    return res;
  } catch (error) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match("/offline.html"));
  }
}

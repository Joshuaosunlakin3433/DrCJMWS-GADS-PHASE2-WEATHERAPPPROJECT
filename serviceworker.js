const cacheName = 'v1';

const cacheAssets = [
       'index.html',
       'weather.css',
       'weather.js',
       'serviceworker.js',
       '/icons/4.jpg'
];




// Call Install Event
self.addEventListener('install',function(e) {
       console.log('Service Worker: Installed');

       e.waitUntil(
              caches
              .open(cacheName)
              .then(cache =>{
                     console.log('Service Worker:Caching Files ');
                     cache.addAll(cacheAssets);
              })
              .then(() => self.skipWaiting())
       );
});

//Call Activate Event
self.addEventListener('activate',function(e) {
       console.log('Service Worker: Activated');
    //Remove Unwanted caches
  e.waitUntil(
       caches.keys().then(cacheNames =>{
              return Promise.all(
                     cacheNames.map(cache =>{
                            if (cache !==cacheName){
                                   console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);                            
                     }
                     })
              );
       })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e=> {
       console.log('Service Worker: Fetching');
       e.respondWith(
              fetch(e.request). catch(() => caches.match(e.request))
      )
});
 
const cacheName = 'apv-v1';
const files = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];

self.addEventListener('install', e => {
    console.log('Service worker instalado');

    e.waitUntil(
        caches.open(cacheName)
            .then( cache => {
                console.log('cache')
                cache.addAll(files)
            })
    )
});

self.addEventListener('activate', e => {
    console.log('service worker activado');

    e.waitUntil(
        caches.keys()
            .then( keys => {
                return Promise.all(
                    keys.filter(key => key !== cacheName)
                        .map(key => caches.delete(key))
                )
            } )
    )
});

self.addEventListener('fetch', e => {
    console.log('Fetch...', e);

    e.respondWith(
        caches.match(e.request)
            .then(cacheResponse => {
                return cacheResponse
            })
            .catch( () => caches.match('/error.html') )
    )
})
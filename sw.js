/* ================================================================
   منارة — Service Worker
   Handles background push notifications for prayer times
================================================================ */
const CACHE_NAME = 'manara-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html'
];

// Install event — cache core assets
self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(URLS_TO_CACHE);
        }).catch(function(e) {
            console.warn('SW cache failed:', e);
        })
    );
});

// Activate event — clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(name) {
                    return name !== CACHE_NAME;
                }).map(function(name) {
                    return caches.delete(name);
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// Fetch event — serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            return cached || fetch(event.request);
        })
    );
});

// Push event — handle incoming push messages
self.addEventListener('push', function(event) {
    var data = {};
    try { data = event.data ? event.data.json() : {}; } catch (e) {
        console.warn('Push data parse error:', e);
    }

    var title = data.title || 'منارة — تذكير الصلاة';
    var options = {
        body: data.body || 'حان وقت الصلاة 🕌',
        icon: data.icon || '/icon-192.png',
        badge: data.badge || '/icon-192.png',
        tag: data.tag || 'prayer',
        renotify: true,
        requireInteraction: false,
        data: { url: '/' }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click event — open/focus the app
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (new URL(client.url).pathname === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});

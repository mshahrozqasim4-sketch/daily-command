const CACHE = 'shahroz-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'Shahroz', body: 'Time to move.' };
  e.waitUntil(
    self.registration.showNotification(data.title || 'Shahroz — Daily Command', {
      body: data.body || '',
      icon: '/icon.png',
      badge: '/icon.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'general',
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow('/');
    })
  );
});

async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { serviceWorker } = await import('./browser');
    serviceWorker.start();
  }
}

initMocks();

export {};

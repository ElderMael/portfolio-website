// Clean up registrations left by previous versions of the application.
// This app intentionally does not register a service worker.
export function unregister(): void {
  if ('serviceWorker' in navigator) {
    void navigator.serviceWorker.ready.then(registration => {
      void registration.unregister();
    });
  }
}

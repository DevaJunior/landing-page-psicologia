export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (
      command: 'config' | 'set' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}
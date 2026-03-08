/**
 * Collects browser/device fingerprint data for security purposes.
 * Only sent on form submission, included in security alert emails.
 */

export interface BrowserFingerprint {
  // Screen
  screenResolution: string;
  screenColorDepth: number;
  devicePixelRatio: number;
  // Browser
  language: string;
  languages: string[];
  platform: string;
  userAgent: string;
  cookiesEnabled: boolean;
  doNotTrack: string | null;
  // Timezone
  timezone: string;
  timezoneOffset: number;
  // Hardware
  hardwareConcurrency: number;
  maxTouchPoints: number;
  deviceMemory: number | null;
  // Connection
  connectionType: string | null;
  // Canvas fingerprint (hash)
  canvasHash: string;
  // WebGL
  webglVendor: string;
  webglRenderer: string;
  // Misc
  pluginsCount: number;
  localStorageAvailable: boolean;
  sessionStorageAvailable: boolean;
  // Timestamp
  collectedAt: string;
}

function getCanvasHash(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'unavailable';

    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('fingerprint', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('fingerprint', 4, 17);

    const dataUrl = canvas.toDataURL();
    // Simple hash
    let hash = 0;
    for (let i = 0; i < dataUrl.length; i++) {
      const char = dataUrl.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash.toString(16);
  } catch {
    return 'blocked';
  }
}

function getWebGLInfo(): { vendor: string; renderer: string } {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return { vendor: 'unavailable', renderer: 'unavailable' };

    const webgl = gl as WebGLRenderingContext;
    const debugInfo = webgl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return { vendor: 'hidden', renderer: 'hidden' };

    return {
      vendor: webgl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'unknown',
      renderer: webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'unknown',
    };
  } catch {
    return { vendor: 'blocked', renderer: 'blocked' };
  }
}

function getConnectionType(): string | null {
  try {
    const nav = navigator as Navigator & { connection?: { effectiveType?: string } };
    return nav.connection?.effectiveType || null;
  } catch {
    return null;
  }
}

function getDeviceMemory(): number | null {
  try {
    const nav = navigator as Navigator & { deviceMemory?: number };
    return nav.deviceMemory || null;
  } catch {
    return null;
  }
}

function isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
  try {
    const storage = window[type];
    const key = '__test__';
    storage.setItem(key, '1');
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function collectFingerprint(): BrowserFingerprint {
  const webgl = getWebGLInfo();

  return {
    screenResolution: `${screen.width}x${screen.height}`,
    screenColorDepth: screen.colorDepth,
    devicePixelRatio: window.devicePixelRatio || 1,
    language: navigator.language,
    languages: [...(navigator.languages || [])],
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    deviceMemory: getDeviceMemory(),
    connectionType: getConnectionType(),
    canvasHash: getCanvasHash(),
    webglVendor: webgl.vendor,
    webglRenderer: webgl.renderer,
    pluginsCount: navigator.plugins?.length || 0,
    localStorageAvailable: isStorageAvailable('localStorage'),
    sessionStorageAvailable: isStorageAvailable('sessionStorage'),
    collectedAt: new Date().toISOString(),
  };
}

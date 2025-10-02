const safeStorage = typeof window !== 'undefined' ? window.localStorage : null;

const storage = {
  get(key, fallback = null) {
    try {
      const raw = safeStorage?.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      safeStorage?.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  },
  remove(key) {
    try {
      safeStorage?.removeItem(key);
    } catch {
      // ignore
    }
  },
};

export default storage;


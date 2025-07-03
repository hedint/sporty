interface IDataCache {
  set: <T>(key: string, data: T, time: number) => void
  get: <T>(key: string) => T | null
  delete: (key: string) => void
}
export interface CacheRecord<T> {
  value: T
  expiresAt: number
}

/**
 * A simple data cache that stores data in localStorage (in memory as a fallback) with expiration.
 */
class DataCache implements IDataCache {
  private memoryCache = new Map<string, CacheRecord<any>>();
  private readonly isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorage();
  }

  private checkLocalStorage(): boolean {
    try {
      const testKey = "__cache_test__";
      localStorage.setItem(testKey, "1");
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sets a value in the cache with an expiration time.
   * @param key - The key under which the data is stored.
   * @param data - The data to be cached.
   * @param time - The time in seconds after which the data will expire.
   */
  set<T>(key: string, data: T, time: number): void {
    const record: CacheRecord<T> = {
      value: data,
      expiresAt: Date.now() + time * 1000,
    };

    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(record));
    } else {
      this.memoryCache.set(key, record);
    }
  }

  get<T>(key: string): T | null {
    const now = Date.now();

    if (this.isLocalStorageAvailable) {
      try {
        const item = localStorage.getItem(key);
        if (!item) {
          return null;
        }

        const record: CacheRecord<T> = JSON.parse(item);
        if (record.expiresAt < now) {
          this.delete(key);
          return null;
        }

        return record.value;
      } catch {
        return null;
      }
    } else {
      const record = this.memoryCache.get(key);
      if (!record) {
        return null;
      }

      if (record.expiresAt < now) {
        this.memoryCache.delete(key);
        return null;
      }

      return record.value;
    }
  }

  delete(key: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(key);
    } else {
      this.memoryCache.delete(key);
    }
  }

  check(key: string): boolean {
    const now = Date.now();

    if (this.isLocalStorageAvailable) {
      try {
        const item = localStorage.getItem(key);
        if (!item) {
          return false;
        }

        const record: CacheRecord<any> = JSON.parse(item);
        if (record.expiresAt < now) {
          this.delete(key);
          return false;
        }

        return true;
      } catch {
        return false;
      }
    } else {
      const record = this.memoryCache.get(key);
      if (!record) {
        return false;
      }

      if (record.expiresAt < now) {
        this.memoryCache.delete(key);
        return false;
      }

      return true;
    }
  }
}

export const dataCache = new DataCache();

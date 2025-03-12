const storageController = (storage: Storage) => {
  const getStorage = (key: string) => {
    const item = storage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  };

  const setStorage = (key: string, value: any) => {
    storage.setItem(key, JSON.stringify(value));
  };

  const removeStorage = (key: string) => {
    storage.removeItem(key);
  };

  const clearStorage = () => {
    storage.clear();
  };

  return {
    getStorage,
    setStorage,
    removeStorage,
    clearStorage,
  };
};

export const { getStorage, setStorage, removeStorage } =
  storageController(localStorage);

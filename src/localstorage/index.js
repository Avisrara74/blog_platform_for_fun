export const setItemToLocalstorage = (key, value) => {
  localStorage.setItem(String(key), String(value));
};

export const removeItemFromLocalstorage = (key) => {
  localStorage.removeItem(key);
};

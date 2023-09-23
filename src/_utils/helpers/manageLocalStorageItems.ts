export const manageLocalStorageItems = (key: string, _id: string) => {
  const storedHiddenIds = JSON.parse(localStorage.getItem(key) || '[]');
  const index = storedHiddenIds.indexOf(_id);
  if (index !== -1) {
    storedHiddenIds.splice(index, 1);
  } else {
    storedHiddenIds.push(_id);
  }
  localStorage.setItem(key, JSON.stringify(storedHiddenIds));
}
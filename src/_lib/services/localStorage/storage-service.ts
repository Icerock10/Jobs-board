class Storage {
  getItem(key: string) {
    const storedItems = window?.localStorage?.getItem(key || '[]');
    return storedItems && JSON.parse(storedItems);
  }
  
  setItem(key: string, value?: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  setTasks(key: string, tasks: object[]) {
    const storedTasks = storageService.getItem(key);
    const uniqueTasks = storedTasks && storedTasks.length ? [...new Set([...storedTasks, tasks])] : tasks;
    storageService.setItem(key, uniqueTasks);
  }
  
  setUpdatedTasks(key: string, updatedTasks: object[]) {
    storageService.setItem(key, updatedTasks);
  }
  
  manageHiddenOrLikedIds(key: string, _id: string) {
    let storedHiddenIds = storageService.getItem(key);
    if (!storedHiddenIds) {
      storageService.setItem(key);
      storedHiddenIds = storageService.getItem(key);
    }
    const index = storedHiddenIds.indexOf(_id);
    if (index !== -1) {
      storedHiddenIds.splice(index, 1);
    } else {
      storedHiddenIds.push(_id);
    }
    storageService.setItem(key, storedHiddenIds);
  }
}

export const storageService = new Storage();
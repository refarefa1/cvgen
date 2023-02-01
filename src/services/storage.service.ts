function saveToStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const storageService = {
    saveToStorage,
    loadFromStorage
}


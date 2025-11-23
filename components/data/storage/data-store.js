class DataStore {
    static instance;
    dbConnection;
    readyCallbacks = [];

    constructor() {
        const request = window.indexedDB.open("pccs.db", 3);
        request.onerror = pccsConsole.log;
        request.onsuccess = (event) => {
            console.log('db connection success', event);
            this.dbConnection = event.target.result;
            this.readyCallbacks.forEach(cb => cb());

            console.log("dbConnection", this.dbConnection)
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // this.dbConnection = db;

            db.createObjectStore("character", {keyPath: 'name'});
        }
        console.log('db connection', this.dbConnection);
    }

    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    onReady(callback) {
        if (this.dbConnection) {
            callback();
        } else {
            this.readyCallbacks.push(callback);
        }
    }

    create(namespace, value){
        const namespaceStore = this.dbConnection
            .transaction([namespace], "readwrite")
            .objectStore(namespace);
        namespaceStore.add(value);
    }

    saveCharacter(character) {
        this.onReady(() => {
            const store = this.dbConnection
                .transaction(["character"], "readwrite")
                .objectStore("character");
            store.put(character);
        });
    }

    loadCharacter(name, callback) {
        this.onReady(() => {
            const store = this.dbConnection
                .transaction(["character"], "readonly")
                .objectStore("character");
            const request = store.get(name);
            request.onsuccess = () => {
                callback(request.result);
            };
            request.onerror = pccsConsole.log;
        });
    }

    /**
     * Empties all object stores in the database.
     * @param {function} [callback] - Optional callback invoked after all stores are cleared.
     */
    emptyDatabase(callback) {
        this.onReady(() => {
            const db = this.dbConnection;
            const storeNames = Array.from(db.objectStoreNames);
            let clearedCount = 0;
            if (storeNames.length === 0) {
                console.log('No object stores to clear.');
                if (callback) callback();
                return;
            }
            storeNames.forEach(storeName => {
                const tx = db.transaction([storeName], 'readwrite');
                const store = tx.objectStore(storeName);
                const clearRequest = store.clear();
                clearRequest.onsuccess = () => {
                    console.log(`Cleared store: ${storeName}`);
                    clearedCount++;
                    if (clearedCount === storeNames.length && callback) {
                        console.log('All stores cleared.');
                        callback();
                    }
                };
                clearRequest.onerror = (e) => {
                    console.error(`Error clearing store ${storeName}:`, e);
                    clearedCount++;
                    if (clearedCount === storeNames.length && callback) {
                        callback();
                    }
                };
            });
        });
    }
}

window.ds = window.ds || DataStore.getInstance();
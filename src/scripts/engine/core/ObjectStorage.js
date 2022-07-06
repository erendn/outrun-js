/**
 * This class manages all world objects in the game.
 */
class ObjectStorage {

    constructor() {
        this._storage = [];
    }

    /**
     * Add a new object to the storage.
     */
    add(object) {
        this._storage.push(object);
    }

    /**
     * Remove an object from the storage.
     */
    remove(object) {
        const index = this._storage.indexOf(object);
        if (index > -1) {
            this._storage.splice(index, 1);
        }
    }

    /**
     * Generator function to iterate through all objects in the storage.
     */
    *iterate() {
        for (let i = 0; i < this._storage.length; ++i) {
            yield this._storage[i];
        }
    }

    /**
     * Generator function to iterate through filtered and sorted objects in the
     * storage.
     */
    *iterate(filter, sort) {
        let subStorage = this._storage.filter(filter);
        subStorage.sort(sort);
        for (let i = 0; i < subStorage.length; ++i) {
            yield subStorage[i];
        }
    }

}

const _ObjectStorage = new ObjectStorage(); // Singleton instance
export default _ObjectStorage;
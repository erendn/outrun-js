/**
 * This class manages the configuration of the engine.
 */
class ConfigManager {

    constructor() {
        this._configs = {}; // Store configs here
        // FIXME: This can be moved to another module
        this._ready = false; // Whether the engine config has been loaded
        this.loadFromFile("./src/scripts/engine/config.json"); // Load the default configuration of the engine
    }

    /**
     * Return if the default config has been loaded.
     */
    isReady() {
        return this._ready;
    }

    /**
     * Asynchronous function to load configuration from a JSON file.
     */
    async loadFromFile(fileName) {
        // Fetch the JSON file
        const res = await fetch(fileName);
        const data = await res.json();
        // Store the configurations read from the file
        for (let key in data) {
            this._configs[key] = data[key];
        }
        this._ready = true;
    }

    /**
     * Get the value of a configuration.
     */
    get(config) {
        return this._configs[config];
    }

    /**
     * Set the value of a configuration.
     */
    set(config, value) {
        this._configs[config] = value;
    }

}

const _ConfigManager = new ConfigManager(); // Singleton instance
export default _ConfigManager;
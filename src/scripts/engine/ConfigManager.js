/**
 * This class manages the configuration of the engine.
 */
class ConfigManager {

    constructor() {
        this._configs = {}; // Store configs here
    }

    /**
     * Load configuration from a JSON file.
     */
    loadFromFile(fileName) {
        const that = this;
        fetch(fileName).then(response => that._configs = response.json());
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
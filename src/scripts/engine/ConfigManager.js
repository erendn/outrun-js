/**
 * This class manages the configuration of the engine.
 */
class ConfigManager {

    constructor() {
        this._configs = {}; // Store configs here
        this.loadFromFile("./src/scripts/engine/config.json"); // Load the default configuration of the engine
    }

    /**
     * Load configuration from a JSON file.
     */
    loadFromFile(fileName) {
        fetch(fileName)
        // Convert to JSON object
        .then(response => response.json())
        // Store the configurations read from the file
        .then(data => {
            for (let key in data) {
                this._configs[key] = data[key];
            }
        });
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
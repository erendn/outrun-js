/**
 * This class is responsible for loading all files under the "assets" folder.
 */
class AssetLoader {

    constructor() {
        this._sprites = new Map();
        this._sounds = new Map();
        this._colors = new Map();
        this._totalAssetCount = 0;
        this.loadAssets();
    }

    /**
     * Convert the path of a file to a unique key for maps.
     */
    static _makeKey(args) {
        let key = "";
        for (let i = 0; i < args.length; ++i) {
            key += args[i];
            if (i < args.length - 1) {
                key += "/";
            }
        }
        return key;
    }

    /**
     * Return the percentage of the loaded assets.
     */
    loadPercentage() {
        return (this._sprites.size + this._sounds.size + this._colors.size) / this._totalAssetCount;
    }

    /**
     * Asynchronous function to load all assets.
     */
    async loadAssets() {
        // Fetch the "dir" file
        const res = await fetch("./src/assets/dir");
        const data = await res.blob();
        const text = await data.text();
        // Load all files
        const lines = text.split("\n");
        for (let i = 0; i < lines.length - 1; ++i) {
            const lineParts = lines[i].split("/");
            const path = AssetLoader._makeKey(lineParts.slice(1));
            if (lineParts[0] == "sprites") {
                this._loadSprite(path);
            } else if (lineParts[0] == "sounds") {
                this._loadSound(path);
            } else if (lineParts[0] == "colors") {
                this._loadColor(path);
            }
        }
    }

    /**
     * Load the sprite from the given path.
     */
    _loadSprite(path) {
        const that = this;
        let image = new Image();
        image.onload = function() {
            // FIXME: File name should not have "."
            that._sprites.set(path.split(".")[0], image);
        }
        image.src = "./src/assets/sprites/" + path;
        this._totalAssetCount++;
    }

    /**
     * Load the sound from the given path.
     */
    _loadSound(path) {
        const that = this;
        let audio = new Audio();
        audio.isLoaded = false;
        audio.oncanplay = function() {
            if (!this.isLoaded) {
                this.isLoaded = true;
            }
            // FIXME: File name should not have "."
            that._sounds.set(path.split(".")[0], audio);
        }
        audio.src = "./src/assets/sounds/" + path;
        this._totalAssetCount++;
    }

    /**
     * Load the color config from the given path.
     */
    _loadColor(path) {
        const that = this;
        fetch("./src/assets/colors/" + path)
        .then(response => response.json())
        .then(data => {
            that._colors.set(path.split(".")[0], data);
        });
        this._totalAssetCount++;
    }

    /**
     * Return the sprite object with the given key.
     */
    getSprite() {
        return this._sprites.get(AssetLoader._makeKey(arguments));
    }

    /**
     * Return the sound object with the given key.
     */
    getSound() {
        return this._sounds.get(AssetLoader._makeKey(arguments));
    }

    /**
     * Return the color config object with the given key.
     */
    getColor() {
        return this._colors.get(AssetLoader._makeKey(arguments));
    }

}

const _AssetLoader = new AssetLoader(); // Singleton instance
export default _AssetLoader;
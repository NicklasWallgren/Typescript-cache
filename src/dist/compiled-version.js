var Mapper = (function () {
    function Mapper() {
    }
    Mapper.fromObject = function (object) {
        return;
    };
    return Mapper;
})();
var Utility_Date = (function () {
    function Utility_Date() {
    }
    Utility_Date.getTimeInSeconds = function () {
        // Get the current date
        var time = new Date();
        return (time.getTime() / 1000);
    };
    return Utility_Date;
})();
var Cache_Backend_LocalStorage = (function () {
    function Cache_Backend_LocalStorage(config) {
        this.TAG_TREE_KEY = "_tagthree";
        this._config = config;
        this._localStorage = new LocalStorage(new Serializer_JSON(), new Unserializer_JSON());
    }
    // Add cache record to the backend cache
    Cache_Backend_LocalStorage.prototype.add = function (key, data, tagKey) {
        // Get the internal tag three
        var tagThree = this.getTagThree();
        // Add the new key to the tag three
        tagThree.addKeyToTag(tagKey, key);
        // Add the data to the local storage
        this._localStorage.add(key, data);
        // Save the tag three to the local cache
        this.saveTagThree();
        return true;
    };
    Cache_Backend_LocalStorage.prototype.get = function (key, tagKey) {
        // Get the internal tag three
        var tagThree = this.getTagThree();
        if (!tagThree.isValidKeyAndTagKeyCombination(key, tagKey)) {
            return null;
        }
        // Get the data from the local storage
        return this._localStorage.get(key);
    };
    // Remove cache record if available
    Cache_Backend_LocalStorage.prototype.remove = function (key, tagKey) {
        // Get the internal tag three
        var tagThree = this.getTagThree();
        // Check if the tag three contains the key
        if (!tagThree.isValidKeyAndTagKeyCombination(key, tagKey)) {
            return false;
        }
        // Remove the key from the tag
        tagThree.removeKeyFromTag(key, tagKey);
        // Check if the tag is empty
        if (tagThree.tagEmpty(tagKey)) {
            tagThree.clear(tagKey);
        }
        // Remove the cache record from local storage
        this._localStorage.remove(key);
        // Save the tag three to the local cache
        this.saveTagThree();
        return true;
    };
    // Remove all cache records matching the tag
    Cache_Backend_LocalStorage.prototype.clear = function (tagKey) {
        // Get the internal tag three
        var tagThree = this.getTagThree();
        if (!tagThree.tagExists(tagKey)) {
            return false;
        }
        // Clear the tag keys
        tagThree.clear(tagKey);
        // Save the tag three to the local cache
        this.saveTagThree();
        return true;
    };
    Cache_Backend_LocalStorage.prototype.getTagThree = function () {
        if (this._tagThree != undefined) {
            return this._tagThree;
        }
        var tagThree = this._localStorage.get(this.TAG_TREE_KEY);
        if (tagThree == null) {
            tagThree = this.buildTagThree();
        }
        else {
            tagThree = Cache_Backend_LocalStorage_TagThree.fromObject(tagThree);
        }
        this._tagThree = tagThree;
        return tagThree;
    };
    Cache_Backend_LocalStorage.prototype.buildTagThree = function () {
        var tagThree = new Cache_Backend_LocalStorage_TagThree();
        this._localStorage.add(this.TAG_TREE_KEY, tagThree);
        return tagThree;
    };
    Cache_Backend_LocalStorage.prototype.saveTagThree = function () {
        console.log("save to cache data + " + JSON.stringify(this._tagThree));
        this._localStorage.add(this.TAG_TREE_KEY, this._tagThree);
    };
    Cache_Backend_LocalStorage.prototype.serializeObject = function (data) {
        return JSON.stringify(data);
    };
    Object.defineProperty(Cache_Backend_LocalStorage.prototype, "config", {
        // Get the cache config
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    return Cache_Backend_LocalStorage;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cache_Backend_LocalStorage_Tag = (function (_super) {
    __extends(Cache_Backend_LocalStorage_Tag, _super);
    function Cache_Backend_LocalStorage_Tag(tag, keys) {
        if (keys === void 0) { keys = []; }
        _super.call(this);
        this._tag = tag;
        this._keys = keys;
    }
    Cache_Backend_LocalStorage_Tag.prototype.add = function (key) {
        if (this.keyExists(key)) {
            return false;
        }
        // Add the key to the list of keys
        this._keys.push(key);
        return true;
    };
    Cache_Backend_LocalStorage_Tag.prototype.remove = function (key) {
        // Check if the given key exists
        if (!this.keyExists(key)) {
            return false;
        }
        // Get the index of the keys
        var index = this._keys.indexOf(key, 0);
        // Remove the key from the list of keys
        this._keys.splice(index, 1);
        return true;
    };
    Object.defineProperty(Cache_Backend_LocalStorage_Tag.prototype, "tag", {
        get: function () {
            return this._tag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cache_Backend_LocalStorage_Tag.prototype, "keys", {
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    Cache_Backend_LocalStorage_Tag.prototype.keyExists = function (key) {
        return (this._keys.indexOf(key, 0) != -1);
    };
    Cache_Backend_LocalStorage_Tag.prototype.tagEmpty = function () {
        return (this._keys.length <= 0);
    };
    Cache_Backend_LocalStorage_Tag.fromObject = function (object) {
        _super.fromObject.call(this, object);
        return new Cache_Backend_LocalStorage_Tag(object._tag, object._keys);
    };
    return Cache_Backend_LocalStorage_Tag;
})(Mapper);
var Cache_Backend_LocalStorage_TagThree = (function (_super) {
    __extends(Cache_Backend_LocalStorage_TagThree, _super);
    function Cache_Backend_LocalStorage_TagThree(tags) {
        if (tags === void 0) { tags = {}; }
        _super.call(this);
        this._tags = tags;
    }
    Cache_Backend_LocalStorage_TagThree.prototype.add = function (tag) {
        this._tags[tag.tag] = tag;
    };
    Object.defineProperty(Cache_Backend_LocalStorage_TagThree.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: true,
        configurable: true
    });
    Cache_Backend_LocalStorage_TagThree.prototype.get = function (tagKey) {
        // Get the tag
        var tag = this._tags[tagKey];
        if (tag == undefined) {
            return null;
        }
        return Cache_Backend_LocalStorage_Tag.fromObject(tag);
    };
    Cache_Backend_LocalStorage_TagThree.prototype.addKeyToTag = function (tagKey, key) {
        // Get the tag object
        var tag = this.get(tagKey);
        // Check if the tag exists in the tag three
        if (tag == undefined) {
            tag = new Cache_Backend_LocalStorage_Tag(tagKey);
            this.add(tag);
        }
        tag.add(key);
    };
    Cache_Backend_LocalStorage_TagThree.prototype.removeKeyFromTag = function (key, tagKey) {
        // Get the tag
        var tag = this.get(tagKey);
        // Check if we found the tag index
        if (tag == null) {
            return false;
        }
        // Remove the key from the tag
        return tag.remove(key);
    };
    Cache_Backend_LocalStorage_TagThree.prototype.clear = function (tagKey) {
        delete this._tags[tagKey];
    };
    Cache_Backend_LocalStorage_TagThree.prototype.isValidKeyAndTagKeyCombination = function (key, tagKey) {
        // Get the tag
        var tag = this.get(tagKey);
        // Check if the tag exists in the tag three
        if (tag == null) {
            return false;
        }
        // Check if the key exists within the tag
        if (!tag.keyExists(key)) {
            return false;
        }
        return true;
    };
    Cache_Backend_LocalStorage_TagThree.prototype.tagExists = function (tagKey) {
        // Get the tag
        var tag = this.get(tagKey);
        // Check if the tag exists in the tag three
        if (tag == null) {
            return false;
        }
        return true;
    };
    Cache_Backend_LocalStorage_TagThree.prototype.tagEmpty = function (tagKey) {
        // Get the tag
        var tag = this.get(tagKey);
        // Check if the tag exists in the tag three
        if (tag == null) {
            return true;
        }
        return tag.tagEmpty();
    };
    Cache_Backend_LocalStorage_TagThree.fromObject = function (object) {
        _super.fromObject.call(this, object);
        return new Cache_Backend_LocalStorage_TagThree(object._tags);
    };
    return Cache_Backend_LocalStorage_TagThree;
})(Mapper);
var Cache_Backend_Factory = (function () {
    function Cache_Backend_Factory() {
    }
    Cache_Backend_Factory.factory = function (type, config) {
        if (type == "localStorage") {
            return new Cache_Backend_LocalStorage(config);
        }
        return null;
    };
    return Cache_Backend_Factory;
})();
var Cache = (function () {
    function Cache(type, config) {
        if (Cache._instance) {
            throw new Error("Error: Instantiation failed: Use Cache.getInstance() instead of new.");
        }
        this.backendCache = Cache_Backend_Factory.factory(type, config);
        Cache._instance = this;
    }
    Cache.getInstance = function (type, config) {
        if (Cache._instance === null) {
            Cache._instance = new Cache(type, config);
        }
        return Cache._instance;
    };
    // Add cache record to the backend cache
    Cache.prototype.add = function (key, data, tagKey) {
        return this.backendCache.add(key, data, tagKey);
    };
    // Get the cache record from the backend cache, if available
    Cache.prototype.get = function (key, tagKey) {
        return this.backendCache.get(key, tagKey);
    };
    // Remove cache record from the backend cache, if available
    Cache.prototype.remove = function (key, tagKey) {
        return this.backendCache.remove(key, tagKey);
    };
    // Add cache record to the backend cache
    Cache.prototype.clear = function (tagKey) {
        return this.backendCache.clear(tagKey);
    };
    Cache._instance = null;
    return Cache;
})();
var CacheTTL = (function (_super) {
    __extends(CacheTTL, _super);
    function CacheTTL() {
        _super.apply(this, arguments);
    }
    CacheTTL.getInstance = function (type, config) {
        if (CacheTTL._instance === null) {
            CacheTTL._instance = new CacheTTL(type, config);
        }
        return CacheTTL._instance;
    };
    // Add cache record to the backend cache
    CacheTTL.prototype.add = function (key, data, tagKey, lifetime) {
        if (lifetime === void 0) { lifetime = CacheTTL.DEFAULT_TTL; }
        // Get the time in seconds
        var timeInSeconds = Utility_Date.getTimeInSeconds();
        // Create the cache DSO object
        var cacheDSO = new Cache_DSO_TTL_DSO(lifetime + timeInSeconds, data);
        return _super.prototype.add.call(this, key, cacheDSO, tagKey);
    };
    // Get the cache record from the backend cache, if available
    CacheTTL.prototype.get = function (key, tagKey) {
        // Get the cache DSO from cache
        var data = _super.prototype.get.call(this, key, tagKey);
        // Check if the cache DSO exists
        if (data == undefined) {
            return null;
        }
        var cacheDSO = Cache_DSO_TTL_DSO.fromObject(data);
        // Check if the cache record has a valid lifetime
        if (!this.isValid(cacheDSO.lifetime)) {
            return null;
        }
        return cacheDSO.data;
    };
    CacheTTL.prototype.isValid = function (lifetime) {
        // Get the time in seconds
        var timeInSeconds = Utility_Date.getTimeInSeconds();
        return (lifetime > timeInSeconds);
    };
    CacheTTL.DEFAULT_TTL = 900;
    CacheTTL._instance = null;
    return CacheTTL;
})(Cache);
var Cache_DSO_TTL_DSO = (function (_super) {
    __extends(Cache_DSO_TTL_DSO, _super);
    function Cache_DSO_TTL_DSO(lifetime, data) {
        _super.call(this);
        this._lifetime = lifetime;
        this._data = data;
    }
    Object.defineProperty(Cache_DSO_TTL_DSO.prototype, "lifetime", {
        get: function () {
            return this._lifetime;
        },
        set: function (lifetime) {
            this._lifetime = lifetime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cache_DSO_TTL_DSO.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    Cache_DSO_TTL_DSO.fromObject = function (object) {
        _super.fromObject.call(this, object);
        return new Cache_DSO_TTL_DSO(object._lifetime, object._data);
    };
    return Cache_DSO_TTL_DSO;
})(Mapper);
var Cache_Config = (function () {
    function Cache_Config(prefix) {
        if (prefix === void 0) { prefix = Cache_Config.DEFAULT_PREFIX; }
        this._prefix = prefix;
    }
    Object.defineProperty(Cache_Config.prototype, "prefix", {
        get: function () {
            return this._prefix;
        },
        set: function (prefix) {
            this._prefix = prefix;
        },
        enumerable: true,
        configurable: true
    });
    Cache_Config.DEFAULT_PREFIX = "";
    return Cache_Config;
})();
var Serializer_JSON = (function () {
    function Serializer_JSON() {
    }
    Serializer_JSON.prototype.serialize = function (data) {
        return JSON.stringify(data);
    };
    return Serializer_JSON;
})();
var Unserializer_JSON = (function () {
    function Unserializer_JSON() {
    }
    Unserializer_JSON.prototype.unserialize = function (data) {
        return JSON.parse(data);
    };
    return Unserializer_JSON;
})();
var LocalStorage = (function () {
    function LocalStorage(serializer, unserializer) {
        //this._localStorage = new nodeLocalstorage.LocalStorage('./scratch');
        this._localStorage = localStorage;
        this._serializer = serializer;
        this._unserializer = unserializer;
    }
    LocalStorage.prototype.add = function (key, data) {
        this.remove(key);
        this._localStorage.setItem(key, this.serialize(data));
    };
    LocalStorage.prototype.get = function (key) {
        var data = this._localStorage.getItem(key);
        if (data == null) {
            return null;
        }
        return this._unserializer.unserialize(data);
    };
    LocalStorage.prototype.remove = function (key) {
        this._localStorage.removeItem(key);
    };
    LocalStorage.prototype.serialize = function (data) {
        return this._serializer.serialize(data);
    };
    return LocalStorage;
})();


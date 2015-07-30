class Cache_Backend_LocalStorage implements Cache_Backend_Interface {
	
	public TAG_TREE_KEY = "_tagthree";
	public BACKEND_TYPE = "LocalStorage";
	public BACKEND_KEY_PREFIX = "_key_prefix";

	protected _config : Cache_Config;
	protected _localStorage: Cache_LocalStorage;
	protected _tagTree: Cache_Backend_LocalStorage_TagTree;

	constructor() {
		this._localStorage = new Cache_LocalStorage(new Serializer_JSON(), new Unserializer_JSON());
	}

	public setConfig(config : Cache_Config): void {
		this._config = config;
	}

	// Add cache record to the backend cache
	public add(key : string, data : any, tagKey : string): boolean {

		// Get the internal tag three
		var tagTree = this.getTagTree();

		// Add the new key to the tag three
		tagTree.addKeyToTag(tagKey, key);

		// Add the data to the local storage
		this._localStorage.add(this.getUniqueKey(tagKey, key), data);

		// Save the tag three to the local cache
		this.saveTagTree();

		return true;
	} 

	public get(key : string, tagKey : string): any {
		// Get the internal tag three
		var tagTree = this.getTagTree();

		if (!tagTree.isValidKeyAndTagKeyCombination(key, tagKey)) {
			return null;
		}

		// Get the data from the local storage
		return this._localStorage.get(this.getUniqueKey(tagKey, key));
	}

	// Remove cache record if available
	public remove(key : string, tagKey : string): boolean {
		// Get the internal tag three
		var tagTree = this.getTagTree();

		// Check if the tag three contains the key
		if (!tagTree.isValidKeyAndTagKeyCombination(key, tagKey)) {
			return false;
		}

		// Remove the key from the tag
		tagTree.removeKeyFromTag(key, tagKey);

		// Check if the tag is empty
		if (tagTree.tagEmpty(tagKey)) {
			tagTree.clear(tagKey);
		}

		// Remove the cache record from local storage
		this._localStorage.remove(this.getUniqueKey(tagKey, key));

		// Save the tag three to the local cache
		this.saveTagTree();

		return true;
	}

	// Remove all cache records matching the tag
	public clear(tagKey : string): boolean {

		// Get the internal tag three
		var tagTree = this.getTagTree();

		if (!tagTree.tagExists(tagKey)) {
			return false;
		}

		// Clear the tag keys
		tagTree.clear(tagKey);

		// Save the tag three to the local cache
		this.saveTagTree();

		return true;
	}

	// Get the backend class name
	public getType(): string {
		return this.BACKEND_TYPE;
	}

	protected getTagTree() : Cache_Backend_LocalStorage_TagTree {
		if (this._tagTree != undefined) {
			return this._tagTree;
		}

		var tagTree =  this._localStorage.get(this.TAG_TREE_KEY);

		if (tagTree == null) {
			tagTree = this.buildTagTree();
		} else {
			tagTree = Cache_Backend_LocalStorage_TagTree.fromObject(tagTree);
		}

		this._tagTree = tagTree;

		return tagTree;
	}

	protected buildTagTree() : Cache_Backend_LocalStorage_TagTree {
		var tagTree = new Cache_Backend_LocalStorage_TagTree();

		this._localStorage.add(this.TAG_TREE_KEY, tagTree);

		return tagTree;
	}

	protected saveTagTree(): void {

		console.log("save to cache data + " + JSON.stringify(this._tagTree));


		this._localStorage.add(this.TAG_TREE_KEY, this._tagTree);
	}

	protected getUniqueKey(tagKey : string, key : string): string {
		return this.BACKEND_KEY_PREFIX + tagKey + key;
	}

	protected serializeObject(data : any) : string {
		return JSON.stringify(data);
	}

	// Get the cache config
	public get config(): Cache_Config {
		return this._config;
	}


}
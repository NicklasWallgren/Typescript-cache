class Cache_Backend_LocalStorage_Tag extends Mapper<Cache_Backend_LocalStorage_Tag> implements Cache_Backend_LocalStorage_Tag_Interface {
	
	public _tag : string;
	public _keys : string[];

	constructor(tag : string, keys : string[] = []) {
		super();

		this._tag = tag;
		this._keys = keys;
	}

	public add(key : string) : boolean {
		if (this.keyExists(key)) {
			return false;
		}

		// Add the key to the list of keys
		this._keys.push(key);

		return true;
	}

	public remove(key : string): boolean {
		// Check if the given key exists
		if (!this.keyExists(key)) {
			return false;
		}

		// Get the index of the keys
		var index = this._keys.indexOf(key, 0);

		// Remove the key from the list of keys
		this._keys.splice(index, 1);

		return true;
	}

	public get tag(): string {
		return this._tag;
	}

	public get keys(): string[] {
		return this._keys;
	}

	public keyExists(key : string): boolean {
		return (this._keys.indexOf(key, 0) != -1);
	}

	public tagEmpty(): boolean {
		return (this._keys.length <= 0);
	}

	public static fromObject(object : Cache_Backend_LocalStorage_Tag_Interface): Cache_Backend_LocalStorage_Tag {
		super.fromObject(object);

		return new Cache_Backend_LocalStorage_Tag(object._tag, object._keys);
	}

}
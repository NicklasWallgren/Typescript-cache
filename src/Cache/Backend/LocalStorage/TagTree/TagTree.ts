class Cache_Backend_LocalStorage_TagTree extends Mapper<Cache_Backend_LocalStorage_TagTree> implements Cache_Backend_LocalStorage_TagTree_Interface {
	
	public _tags : { [tag: string] : Cache_Backend_LocalStorage_Tag; };

	constructor(tags : { [tag: string] : Cache_Backend_LocalStorage_Tag; } = {}) {
		super();

		this._tags = tags;
	}

	public add(tag : Cache_Backend_LocalStorage_Tag) : void {
		this._tags[tag.tag] = tag;
	}

	public get tags(): { [tag: string] : Cache_Backend_LocalStorage_Tag; } {
		return this._tags;
	}

	public get(tagKey : string): Cache_Backend_LocalStorage_Tag {
		// Get the tag
		var tag = <Cache_Backend_LocalStorage_Tag_Interface>this._tags[tagKey];

		if (tag == undefined) {
			return null;
		}

		return Cache_Backend_LocalStorage_Tag.fromObject(tag);
	}

	public addKeyToTag(tagKey, key) {
		// Get the tag object
		var tag = this.get(tagKey);

		// Check if the tag exists in the tag three
		if (tag == undefined) {
			tag = new Cache_Backend_LocalStorage_Tag(tagKey);

			this.add(tag);
		}
		
		tag.add(key);
	}

	public removeKeyFromTag(key, tagKey): boolean {
		// Get the tag
		var tag = this.get(tagKey);

		// Check if we found the tag index
		if (tag == null) {
			return false;
		}

		// Remove the key from the tag
		return tag.remove(key);
	}

	public clear(tagKey : string): void {
		delete this._tags[tagKey];
	}

	public isValidKeyAndTagKeyCombination(key : string, tagKey : string): boolean {
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
	}

	public tagExists(tagKey : string): boolean {
		// Get the tag
		var tag = this.get(tagKey);

		// Check if the tag exists in the tag three
		if (tag == null) {
			return false;
		}

		return true;
	}

	public tagEmpty(tagKey : string): boolean {
		// Get the tag
		var tag = this.get(tagKey);

		// Check if the tag exists in the tag three
		if (tag == null) {
			return true;
		}

		return tag.tagEmpty();
	}

	public static fromObject(object : Cache_Backend_LocalStorage_TagTree_Interface): Cache_Backend_LocalStorage_TagTree {
		super.fromObject(object);

		return new Cache_Backend_LocalStorage_TagTree(object._tags);
	}



}

class Cache_Config {
	
	protected static DEFAULT_PREFIX = "";

	protected _prefix : string;

	constructor(prefix : string = Cache_Config.DEFAULT_PREFIX) {
		this._prefix = prefix;
	}

	get prefix(): string {
		return this._prefix;
	}

	set prefix(prefix : string) {
		this._prefix = prefix;
	}
}
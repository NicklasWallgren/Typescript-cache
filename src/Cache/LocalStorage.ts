class Cache_LocalStorage {
	
	protected _localStorage: any;
	protected _serializer : Serializer_Interface;
	protected _unserializer : Unserializer_Interface;

	constructor(serializer : Serializer_Interface, unserializer: Unserializer_Interface) {
		//this._localStorage = new nodeLocalstorage.LocalStorage('./scratch');
		this._localStorage = localStorage;
		this._serializer = serializer;
		this._unserializer = unserializer;
	}

	public add(key : string, data : any): any {
		this._localStorage.setItem(key, this.serialize(data));
	}

	public get(key : string) : any {
		var data = this._localStorage.getItem(key);

		if (data == null) {
			return null;
		}

		return this._unserializer.unserialize(data);
	}

	public remove(key : string): void {
		this._localStorage.removeItem(key);
	}

	protected serialize(data : any) : string {
		return this._serializer.serialize(data);
	}
}
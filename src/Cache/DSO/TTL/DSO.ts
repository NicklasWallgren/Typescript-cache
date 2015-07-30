class Cache_DSO_TTL_DSO extends Mapper<Cache_DSO_TTL_DSO>  implements Cache_DSO_TTL_Interface {

	public _lifetime : number;
	public _data : any;

	constructor(lifetime : number, data : any) {
		super();

		this._lifetime = lifetime;
		this._data = data;
	}

	get lifetime(): number {
		return this._lifetime;
	}

	get data(): any {
		return this._data;
	}

	set lifetime(lifetime : number) {
		this._lifetime = lifetime;
	}

	set data(data : any) {
		this._data = data;
	}

	public static fromObject(object : Cache_DSO_TTL_Interface): Cache_DSO_TTL_DSO {
		super.fromObject(object);

		return new Cache_DSO_TTL_DSO(object._lifetime, object._data);
	}

}

class Cache {

	protected backendCache : Cache_Backend_Interface;

	protected static _instance : Cache = null;
 
    constructor(type : string, config : Cache_Config) {
        if (Cache._instance){
            throw new Error("Error: Instantiation failed: Use Cache.getInstance() instead of new.");
        }

        this.backendCache = Cache_Backend_Factory.factory(type, config);

        Cache._instance = this;
    }
 
    public static getInstance(type : string, config : Cache_Config): Cache  {
        if (Cache._instance === null) {
            Cache._instance = new Cache(type, config);
        }

        return Cache._instance;
    }

    // Add cache record to the backend cache
	public add(key : string, data : any, tagKey : string): boolean {
		return this.backendCache.add(key, data, tagKey);
	} 

	// Get the cache record from the backend cache, if available
	public get(key : string, tagKey : string): any {
		return this.backendCache.get(key, tagKey);
	} 

	// Remove cache record from the backend cache, if available
	public remove(key : string, tagKey : string): boolean {
		return this.backendCache.remove(key, tagKey);
	} 

	// Add cache record to the backend cache
	public clear(tagKey : string): boolean {
		return this.backendCache.clear(tagKey);
	} 

}


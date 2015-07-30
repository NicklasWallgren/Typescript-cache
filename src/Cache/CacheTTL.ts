class CacheTTL extends Cache {

	protected static DEFAULT_TTL = 500;

	protected static _instance : CacheTTL = null;

    public static getInstance(type : string, config : Cache_Config): CacheTTL  {
        if (CacheTTL._instance === null) {
            CacheTTL._instance = new CacheTTL(type, config);
        }

        return CacheTTL._instance;
    }

	// Add cache record to the backend cache
	public add(key : string, data : any, tagKey : string, lifetime : number = CacheTTL.DEFAULT_TTL): boolean {

		// Get the time in seconds
		var timeInSeconds = Utility_Date.getTimeInSeconds();

		// Create the cache DSO object
		var cacheDSO = new Cache_DSO_TTL_DSO(lifetime + timeInSeconds, data);

		return super.add(key, cacheDSO, tagKey);
	} 

	// Get the cache record from the backend cache, if available
	public get(key : string, tagKey : string): any {

		// Get the cache DSO from cache
		var data = <Cache_DSO_TTL_Interface>super.get(key, tagKey);

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

	} 

	protected isValid(lifetime : number): boolean {
		// Get the time in seconds
		var timeInSeconds = Utility_Date.getTimeInSeconds();

		return (lifetime > timeInSeconds);
	}


}

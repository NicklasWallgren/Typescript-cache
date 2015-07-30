interface Cache_Backend_Interface {
	
	// Set the backend cache config
	setConfig(config : Cache_Config): void;

	// Add cache record to the backend cache
	add(key : string, data : any, tagKey : string): any;

	// Load cache record if available
	get(key : string, tagKey : string): any;

	// Remove cache record if available
	remove(key : string, tagKey : string): boolean;

	// Remove all cache records matching the tag
	clear(tagKey : string): boolean;

	// Get the backend class name
	getType(): string;

}
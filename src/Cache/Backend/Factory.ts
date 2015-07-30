class Cache_Backend_Factory {

	// The available backend types
	protected static _backendTypes : { [backendType: string] : Cache_Backend_Interface; };

	public static factory(type : string, config : Cache_Config) : Cache_Backend_Interface {
		var backend : Cache_Backend_Interface = Cache_Backend_Factory._backendTypes[type];

		// Check if the backend type is available
		if (backend == null) {
			return null;
		}

		// Set the config
		backend.setConfig(config);

		return backend;
	}

	// Register a new backend definition
	public static addBackendDefinition(backend : Cache_Backend_Interface): void {
		Cache_Backend_Factory._backendTypes[backend.getType()] = backend;
	}


}





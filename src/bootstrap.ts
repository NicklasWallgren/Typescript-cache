/// <reference path="Includes/node.d.ts" />

/// <reference path="Mapper/Mapper.ts" />

/// <reference path="Utility/Date.ts" />

/// <reference path="Cache/LocalStorage.ts" />
/// <reference path="Cache/Backend/Interface.ts" />
/// <reference path="Cache/Backend/LocalStorage/LocalStorage.ts" />
/// <reference path="Cache/Backend/LocalStorage/Tag/Interface.ts" />
/// <reference path="Cache/Backend/LocalStorage/Tag/Tag.ts" />
/// <reference path="Cache/Backend/LocalStorage/TagTree/Interface.ts" />
/// <reference path="Cache/Backend/LocalStorage/TagTree/TagTree.ts" />
/// <reference path="Cache/Backend/Factory.ts" />
/// <reference path="Cache/Cache.ts" />
/// <reference path="Cache/CacheTTL.ts" />
/// <reference path="Cache/DSO/TTL/Interface.ts" />
/// <reference path="Cache/DSO/TTL/DSO.ts" />
/// <reference path="Cache/Config.ts" />

/// <reference path="Serializer/Interface.ts" />
/// <reference path="Serializer/JSON.ts" />

/// <reference path="Unserializer/Interface.ts" />
/// <reference path="Unserializer/JSON.ts" />

// Register the backends
Cache_Backend_Factory.addBackendDefinition(new Cache_Backend_LocalStorage());


















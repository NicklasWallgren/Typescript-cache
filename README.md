##Typescript-cache

Cache framework written in Typescript

-------------
### **Examples**

```
// The cache config, prefix etc
var config = new Cache_Config();

// The backend type, only implements localStorage atm
var cacheBackendType = "localStorage";

// Get the cache instance
var cache = CacheTTL.getInstance(cacheBackendType, config);

// The cache record lifetime in seconds
var lifetimeInSeconds = 500;

// The data to be stored
var storeDTO = new StoreDTO("storeId", "cityName");

// Add the data to the cache, tags = stores, lifetime = 500
cache.add(storeDTO.storeId, storeDTO, "stores", lifetimeInSeconds);

// Get the cache record
storeDTO = cache.get("storeId", "stores");

console.log(storeDTO);
```
-------------
###  **Cache options**
```

```
-------------
###  **Cache DSO**
```

```
-------------

###  **Cache backends**
```

```
-------------

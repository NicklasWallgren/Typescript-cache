var StoreDTO = (function () {
    
    function StoreDTO(storeId, storeName) {
        this._storeId = storeId;
        this._storeName = storeName;
    }
    
    Object.defineProperty(StoreDTO.prototype, "storeId", {
        get: function () {
            return this._storeId;
        },
        set: function (storeId) {
            this._storeId = storeId;
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(StoreDTO.prototype, "storeName", {
        get: function () {
            return this._storeName;
        },
        set: function (storeName) {
            this._storeName = storeName;
        },
        enumerable: true,
        configurable: true
    });
    
    return StoreDTO;
})();
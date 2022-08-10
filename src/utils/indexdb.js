var storeName = "tabData";
var Indexdb = {
  dbInit() {
    return new Promise((resolve, reject) => {
      const connection = window.indexedDB.open("tabDb", 2);
      connection.onsuccess = function (event) {
        resolve(event.target.result);
      };
      connection.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          var objectStore = db.createObjectStore(storeName, { keyPath: "key" });
          objectStore.createIndex("data", "data", { unique: false });
          objectStore.createIndex("time", "time", { unique: false });
        }
      };
      connection.onerror = function (err) {
        reject(err);
      };
    });
  },
  async add(key, data) {
    var db = await this.dbInit();
    return new Promise((r, j) => {
      var transaction = db.transaction([storeName], "readwrite");
      transaction.onerror = function (e) {
        r(e.target.error);
      };
      var objectStore = transaction.objectStore(storeName);
      var request = objectStore.add({
        key,
        data,
        time: Date.now(),
      });
      request.onerror = (e) => {
        j(e.target.error);
      };
      request.onsuccess = function (e) {
        if (e.target.result) {
          r(true);
        } else r(false);
      };
    });
  },
  async del(key) {
    var db = await this.dbInit();
    return new Promise((r, j) => {
      var transaction = db.transaction([storeName], "readwrite");
      transaction.onerror = function (e) {
        r(e.target.error);
      };
      var objectStore = transaction.objectStore(storeName);
      var request = objectStore.delete(key);
      request.onsuccess = function () {
        r(true);
      };
      request.onerror = (e) => {
        j(e.target.error);
      };
    });
  },
  async set(key, data) {
    var db = await this.dbInit();
    return new Promise((r) => {
      var transaction = db.transaction([storeName], "readwrite");
      transaction.onerror = () => {
        r(false);
      };
      var objectStore = transaction.objectStore(storeName);
      var request = objectStore.get(key);
      request.onsuccess = (e) => {
        var cursor = e.target.result;
        if (cursor) {
          var putRequest = objectStore.put({
            key,
            data,
            time: Date.now(),
          });
          putRequest.onsuccess = (e2) => {
            cursor = e2.target.result;
            if (cursor) {
              r(true);
            } else r(false);
          };
        } else {
          r(this.add(key, data));
        }
      };
    });
  },
  async get(key) {
    var db = await this.dbInit();
    return new Promise((r, j) => {
      var transaction = db.transaction([storeName]);
      var objectStore = transaction.objectStore(storeName);
      var request = objectStore.get(key);
      request.onerror = (e) => {
        j(e.target.error);
      };
      request.onsuccess = function () {
        if (request.result) {
          r(request.result);
        } else {
          r(false);
        }
      };
    });
  },
  async hasKey(key) {
    var db = await this.dbInit();
    return new Promise((r) => {
      var transaction = db.transaction([storeName]);
      transaction.onerror = () => {
        r(false);
      };
      var objectStore = transaction.objectStore(storeName);
      var request = objectStore.get(key);
      request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
          // key already exist
          r(true);
        } else {
          // key not exist
          r(false);
        }
      };
    });
  },
  async getToken() {
    var token = await this.get("token");
    if (!token) {
      return null;
    } else {
      //30天过期
      if (token.time + 1000 * 60 * 60 * 24 * 30 < Date.now()) {
        this.del("token");
        return null;
      } else {
        return token.data;
      }
    }
  },
};

export default Indexdb;

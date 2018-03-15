/**
 * Class representing local storage mock
 *
 * @class LocalStorageMock
 */
class LocalStorageMock {
  /**
   * Creates an instance of LocalStorageMock.
   *
   * @memberof LocalStorageMock
   */
  constructor() {
    this.store = {};
  }
  /**
   * Clear the local storage
   *
   * @returns {any} Clear the store
   *
   * @memberof LocalStorageMock
   */
  clear() {
    this.store = {};
  }

  /**
   * Get item from local storage
   *
   * @param {any} key - Store object key
   *
   * @returns {any} Value of the key
   *
   * @memberof LocalStorageMock
   */
  getItem(key) {
    return this.store[key] || null;
  }

  /**
   * Set item on the local storage
   *
   * @param {any} key - Store object key
   * @param {any} value - Value of Key
   *
   * @returns {any} Set data to store
   *
   * @memberof LocalStorageMock
   */
  setItem(key, value) {
    this.store[key] = value;
  }

  /**
   * Remove item from store
   *
   * @param {any} key - Store object key
   *
   * @returns {any} Remove item from store
   * @memberof LocalStorageMock
   */
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

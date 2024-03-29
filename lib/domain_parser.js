function DomainParser() {
  /**
   * @param {string} url - URL to parse domain from
   * @return {string} - Passed URL's domain
   */
  this.__parseDomainFromUrl = function(url) {
    var urlObject = new URL(url);
    var hostname = urlObject.hostname;
    console.log(hostname);
    return hostname.match(/^(?:www\.)?(.*)/)[1];
  }

  /**
   * Get the current tab domain.
   *
   * @param {function(string)} callback - called when the domain of the current tab
   *   is found.
   */
  this.getCurrentTabDomain = function(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
      active: true,
      currentWindow: true
    };
    var self = this;

    chrome.tabs.query(queryInfo, function(tabs) {
      // chrome.tabs.query invokes the callback with a list of tabs that match the
      // query. When the popup is opened, there is certainly a window and at least
      // one tab, so we can safely assume that |tabs| is a non-empty array.
      // A window can only have one active tab at a time, so the array consists of
      // exactly one tab.
      var tab = tabs[0];

      // A tab is a plain object that provides information about the tab.
      // See https://developer.chrome.com/extensions/tabs#type-Tab
      var url = tab.url;

      // tab.url is only available if the "activeTab" permission is declared.
      // If you want to see the URL of other tabs (e.g. after removing active:true
      // from |queryInfo|), then the "tabs" permission is required to see their
      // "url" properties.
      console.assert(typeof url == 'string', 'tab.url should be a string');

      var domain = self.__parseDomainFromUrl(url);
      callback(domain);
    });
  }
}

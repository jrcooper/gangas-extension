function changeIconForActiveTab(deals) {
  var domainParser = new DomainParser();
  domainParser.getCurrentTabDomain(function(domain) {
    if (anyDealsForDomain(deals, domain)) {
      changeIconToMatched();
    } else {
      changeIconToDefault();
    }
  });
}

function changeIconToMatched() {
  chrome.browserAction.setIcon({path: 'icons/matched_icon.png'});
}

function changeIconToDefault() {
  chrome.browserAction.setIcon({path: 'icons/default_icon.png'});
}

function anyDealsForDomain(deals, domain) {
  return deals.some(function(deal) { return deal.website == domain; })
}

function initTabOnActivated() {
  chrome.tabs.onActivated.addListener(function(changeInfo) {
    dataStorage.getDeals(function(deals) {
      changeIconForActiveTab(deals);
    });
  });
}

function initTabOnUpdated() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    dataStorage.getDeals(function(deals) {
      changeIconForActiveTab(deals);
    });
  });
}

function initTabCallbacks() {
  initTabOnActivated();
  initTabOnUpdated();
}

var dataStorage = new DataStorage(configOptions);
initTabCallbacks();

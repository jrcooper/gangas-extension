/**
 * @param {string} statusText - text to render on popup
 */
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function dealsForDomain(deals, domain) {
  return deals.filter(function(deal) { return deal.website == domain; })
}

function showDeals(deals) {
  renderStatus('Deals: ' + deals.length);
}

$(document).ready(function() {
  var dataStorage = new DataStorage(configOptions);

  dataStorage.getDeals(function(deals) {
    if (deals) {
      var domainParser = new DomainParser();
      domainParser.getCurrentTabDomain(function(domain) {
        var domainDeals = dealsForDomain(deals, domain);
        if (domainDeals.length) {
          showDeals(domainDeals);
        } else {
          renderStatus('No deals found for domain ' + domain);
        }
      });
    } else {
      renderStatus('POSSIBLE ERROR: deals list was not loaded');
    }
  });

});

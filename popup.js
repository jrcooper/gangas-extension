/**
 * @param {string} statusText - text to render on popup
 */
function renderStatus(statusText) {
  $('#status').html(statusText);
}

function dealsForDomain(deals, domain) {
  return deals.filter(function(deal) { return deal.website == domain; })
}

function showStatus(domain, dealsCount) {
  var dealsWord = '';
  if (dealsCount == 1) {
    dealsWord = 'deal';
  } else {
    dealsWord = 'deals';
  }

  renderStatus(dealsCount + ' ' + dealsWord + ' found for domain ' + domain);
}

function showDeals(deals) {
  var dealsHtml = '';
  deals.forEach(function(deal) {
    dealsHtml += '<div class="deal-wrapper">';

    if (deal.code_or_deal_page) {
      dealsHtml += '<div class="row"><p class="label">Code or Deal Page:</p><p class="value">' + deal.code_or_deal_page + '</p></div>';
    }
    if (deal.secondary_type) {
      dealsHtml += '<div class="row"><p class="label">Secondary Type:</p><p class="value">' + deal.secondary_type + '</p></div>';
    }
    if (deal.amount) {
      dealsHtml += '<div class="row"><p class="label">Amount:</p><p class="value">' + deal.amount + '</p></div>';
    }
    if (deal.scope) {
      dealsHtml += '<div class="row"><p class="label">Scope:</p><p class="value">' + deal.scope + '</p></div>';
    }
    if (deal.min_purchase) {
      dealsHtml += '<div class="row"><p class="label">Min. Purchase:</p><p class="value">' + deal.min_purchase + '</p></div>';
    }
    if (deal.to_qualify) {
      dealsHtml += '<div class="row"><p class="label">To Qualify:</p><p class="value">' + deal.to_qualify + '</p></div>';
    }
    if (deal.end_date) {
      dealsHtml += '<div class="row"><p class="label">End Date:</p><p class="value">' + deal.end_date + '</p></div>';
    }

    dealsHtml += '</div>';
  });

  $('#deals-wrapper').html(dealsHtml);
}

$(document).ready(function() {
  var dataStorage = new DataStorage(configOptions);

  dataStorage.getDeals(function(deals) {
    if (deals) {
      var domainParser = new DomainParser();
      domainParser.getCurrentTabDomain(function(domain) {
        var domainDeals = dealsForDomain(deals, domain);
        if (domainDeals.length) {
          showStatus(domain, domainDeals.length);
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

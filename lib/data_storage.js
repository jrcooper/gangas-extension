function DataStorage(configOptions) {
  this.dealsExpireMins = configOptions.deals_expire_mins
  this.serverConnector = new ServerConnector(
    configOptions.server_address,
    configOptions.auth_token
  );
  this.logger = new Logger('DATA STORAGE');

  this.data = {
    deals: []
  };

  this.__loadDealsList = function(callback) {
    if (callback == undefined)
      callback = function(){}

    var self = this;
    this.serverConnector.loadDealsList(function(data) {
      if (data != null) {
        self.data.deals = data;

        lscache.set('deals', self.data.deals, self.dealsExpireMins);
        self.logger.log('Deals list saved into local storage');
        callback(self.data.deals);
      } else {
        callback(null);
      }
    });
  };

  this.getDeals = function(callback, forcibly_load_from_server = false) {
    var self = this;

    var data = lscache.get('deals');
    if (forcibly_load_from_server || !data || data.length === 0) {
      self.logger.log('Loading from backend server...');
      self.__loadDealsList(callback);
    } else {
      self.logger.log('Deals list loaded from local storage. Running callback...');
      callback(data);
    }
  }

};

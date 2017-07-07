function ServerConnector(server_address, auth_token) {
  this.serverAddress = server_address;
  this.authToken     = auth_token;
  this.sServerPrefix  = '/api/v1/';
  this.logger         = new Logger('SERVER CONNECTOR');

  this.serverUrls = {
    'dealsList': this.sServerPrefix + '/deals.json'
  };

  this.checkResponseStructure = function(response) {
    return (
      typeof(response.success) != 'undefined' &&
      response.success &&
      typeof(response.data) == 'object'
    );
  }

  this.loadDealsList = function(callback) {
    var self = this;
    self.logger.log('Loading Deals list');

    $.ajax({
      type: "GET",
      url: this.serverAddress + this.serverUrls.dealsList + '?access_token=' + this.authToken
    }).done(function(response) {
      if (self.checkResponseStructure(response)) {
        callback(response.data, true);
      } else {
        self.logger.error('Deals list response structure is not valid');
        callback(null);
      }
    }).fail(function(response) {
      self.logger.error('Deals list loading failed');
      callback(null);
    });
  };

};

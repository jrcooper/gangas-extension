function Logger(name) {
  this.loggerName = name;

  this.__console = function(mode, info){
    console.log('[' + mode + '][' + this.loggerName + ']', info);
  }

  this.error = function(info){
    this.__console('ERROR', info);
  }

  this.log = function(info){
    this.__console('INFO', info);
  }

  this.info = this.log;
}

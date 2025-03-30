class Logger {
  constructor() {
    //Store ANSI colors code 
    this.colors = {
      WHITE: '\x1b[0m',
      INFO: '\x1b[34m',
      DEBUG: '\x1b[35m',
      SUCCESS: '\x1b[32m',
      WARNING: '\x1b[33m',
      ERROR: '\x1b[31m', 
    };
  }
  //Get the current time
  getTime() {
    return new Date().toUTCString().slice(5);
  }
  //Logging message at MASTER
  master(msg) {
    const timestamp = this.getTime();
    const loggerMsg = `[${timestamp}][SERVER]: ${msg}`

    console.log(`${this.colors.INFO}${loggerMsg}${this.colors.WHITE}`);
  }
}

//Top-level function to create new instance of Logger
const logger = () => {
  return new Logger()
}

//Export the top-level function
module.exports = logger;
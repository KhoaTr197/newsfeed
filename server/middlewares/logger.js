const morgan = require('morgan');
// ----------------------------

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
    this.morganFormat = '[:date[web]][SERVER]: :method :url :status :response-time ms';
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
  activity() {
    return morgan(this.morganFormat, {
      stream: {
        write: (message) => {
          // Extract status code from the message (assuming it's in the format)
          const statusMatch = message.match(/\b(\d{3})\b(?=\s+\d+\.\d+\s+ms)/);
          let color = this.colors.WHITE;
          if (statusMatch) {
            const status = parseInt(statusMatch[1], 10);
            if (status >= 200 && status < 300) color = this.colors.SUCCESS;
            else if (status >= 300 && status < 400) color = this.colors.WARNING;
            else if (status >= 400) color = this.colors.ERROR;
          }
          console.log(`${color}${message.trim()}${this.colors.WHITE}`);
        }
      }
    });
  }
}

//Top-level function to create new instance of Logger
const logger = () => {
  return new Logger()
}

//Export the top-level function
module.exports = logger;
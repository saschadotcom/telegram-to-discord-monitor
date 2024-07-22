const log = require("loglevel");
const prefix = require("loglevel-plugin-prefix");
const chalk = require("chalk");

prefix.reg(log);
log.setLevel("info");

prefix.apply(log, {
  format(level, name, timestamp) {
    return `${chalk.gray(`[${timestamp}]`)} ${
      level === "info"
        ? chalk.blue(`[${level.toUpperCase()}] -`)
        : level === "warn"
        ? chalk.yellow(`[${level.toUpperCase()}] -`)
        : chalk.red(`[${level.toUpperCase()}] -`)
    }`;
  },
});

module.exports = log;

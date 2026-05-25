const emojis = {
  trace: '🔍',
  debug: '🐛',
  info: '✨',
  warn: '⚠️',
  error: '🚨',
  fatal: '💀'
};

const levels = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
};

const defaultColors = {
  foreground: '#d3c0c8',
  background: '#2d2d2d',
  black: '#2d2d2d',
  red: '#f2777a',
  green: '#99cc99',
  yellow: '#ffcc66',
  blue: '#6699cc',
  magenta: '#cc99cc',
  cyan: '#66cccc',
  white: '#d3d0c8',
  brightBlack: '#747369'
};

export default class Nanologger {
  constructor(name = 'unknown', opts = {}) {
    this._name = name;
    this._colors = Object.assign({ ...defaultColors }, opts.colors);

    try {
      this.logLevel = window.localStorage.getItem('logLevel') || 'info';
    } catch {
      this.logLevel = 'info';
    }

    this._logLevel = levels[this.logLevel];
  }

  trace(...args) {
    this._print('trace', ...args);
  }

  debug(...args) {
    this._print('debug', ...args);
  }

  info(...args) {
    this._print('info', ...args);
  }

  warn(...args) {
    this._print('warn', ...args);
  }

  error(...args) {
    this._print('error', ...args);
  }

  fatal(...args) {
    this._print('fatal', ...args);
  }

  _print(level, ...params) {
    if (levels[level] < this._logLevel) return;

    const time = getTimeStamp();
    const emoji = emojis[level];

    const msgColor =
      level === 'error' || level === 'fatal'
        ? this._colors.red
        : level === 'warn'
          ? this._colors.yellow
          : this._colors.green;

    const objs = [];
    const args = [null];
    let msg = `%c%s ${emoji} %c%s`;

    args.push(color(this._colors.brightBlack), time);
    args.push(color(this._colors.magenta), this._name);

    for (let i = 0, len = params.length; i < len; i++) {
      const arg = params[i];
      if (typeof arg === 'string') {
        if (i === 0) {
          // first string argument is in color
          msg += ' %c%s';
          args.push(color(msgColor));
          args.push(arg);
        } else if (/ms$/.test(arg)) {
          // arguments finishing with 'ms', grey out
          msg += ' %c%s';
          args.push(color(this._colors.brightBlack));
          args.push(arg);
        } else {
          // normal colors
          msg += ' %c%s';
          args.push(color(this._colors.white));
          args.push(arg);
        }
      } else if (typeof arg === 'number') {
        msg += ' %c%d';
        args.push(color(this._colors.magenta));
        args.push(arg);
      } else {
        objs.push(arg);
      }
    }

    args[0] = msg;
    args.push(...objs);

    // In IE/Edge console functions don't inherit from Function.prototype
    // so this is necessary to get all the args applied.
    Function.prototype.apply.apply(console.log, [console, args]);
  }
}

function color(color) {
  return `color: ${color};`;
}

function getTimeStamp() {
  const date = new Date();
  const hours = pad(date.getHours().toString());
  const minutes = pad(date.getMinutes().toString());
  const seconds = pad(date.getSeconds().toString());
  return `${hours}:${minutes}:${seconds}`;
}

function pad(str) {
  return str.length !== 2 ? 0 + str : str;
}

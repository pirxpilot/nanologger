import assert from 'node:assert/strict';
import { after, before, describe, it, mock } from 'node:test';

import Nanologger from './index.js';

describe('Nanologger', () => {
  describe('constructor', () => {
    it('defaults name to "unknown"', () => {
      const log = new Nanologger();
      assert.equal(log._name, 'unknown');
    });

    it('accepts a custom name', () => {
      const log = new Nanologger('my-logger');
      assert.equal(log._name, 'my-logger');
    });

    it('defaults logLevel to "info" when localStorage is unavailable', () => {
      const log = new Nanologger();
      assert.equal(log.logLevel, 'info');
    });

    it('merges custom colors with defaults', () => {
      const log = new Nanologger('x', { colors: { red: '#ff0000' } });
      assert.equal(log._colors.red, '#ff0000');
      assert.ok(log._colors.green); // default preserved
    });
  });

  describe('log methods', () => {
    let consoleMock;

    before(() => {
      consoleMock = mock.method(console, 'log', () => {});
    });

    after(() => {
      consoleMock.mock.restore();
    });

    it('info() calls console.log', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.info('hello');
      assert.equal(consoleMock.mock.calls.length, 1);
    });

    it('warn() calls console.log', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.warn('watch out');
      assert.equal(consoleMock.mock.calls.length, 1);
    });

    it('error() calls console.log', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.error('oh no');
      assert.equal(consoleMock.mock.calls.length, 1);
    });

    it('fatal() calls console.log', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.fatal('send help');
      assert.equal(consoleMock.mock.calls.length, 1);
    });

    it('debug() is suppressed at default "info" level', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.debug('suppressed');
      assert.equal(consoleMock.mock.calls.length, 0);
    });

    it('trace() is suppressed at default "info" level', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.trace('suppressed');
      assert.equal(consoleMock.mock.calls.length, 0);
    });

    it('passes the logger name in the format args', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('myapp');
      log.info('msg');
      const args = consoleMock.mock.calls[0].arguments;
      assert.ok(args.includes('myapp'));
    });

    it('passes the message string in the format args', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.info('hello world');
      const args = consoleMock.mock.calls[0].arguments;
      assert.ok(args.includes('hello world'));
    });

    it('includes the emoji for the log level in the format string', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.info('msg');
      const fmt = consoleMock.mock.calls[0].arguments[0];
      assert.ok(fmt.includes('✨'));
    });

    it('passes numeric arguments with %d format', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      log.info('count', 42);
      const fmt = consoleMock.mock.calls[0].arguments[0];
      assert.ok(fmt.includes('%d'));
      const args = consoleMock.mock.calls[0].arguments;
      assert.ok(args.includes(42));
    });

    it('appends object arguments at the end', () => {
      consoleMock.mock.resetCalls();
      const log = new Nanologger('test');
      const obj = { foo: 'bar' };
      log.info('msg', obj);
      const args = consoleMock.mock.calls[0].arguments;
      assert.ok(args.includes(obj));
    });
  });
});

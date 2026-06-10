import { describe, it, expect } from 'vitest';
import { PayBotApiError, getErrorMessage } from '../src/errors.js';

describe('PayBotApiError', () => {
  it('should set all properties from constructor', () => {
    const err = new PayBotApiError('Not found', 'NOT_FOUND', 404, { botId: 'x' });
    expect(err.message).toBe('Not found');
    expect(err.code).toBe('NOT_FOUND');
    expect(err.statusCode).toBe(404);
    expect(err.details).toEqual({ botId: 'x' });
  });

  it('should have name "PayBotApiError"', () => {
    const err = new PayBotApiError('msg', 'CODE', 500);
    expect(err.name).toBe('PayBotApiError');
  });

  it('should extend Error', () => {
    const err = new PayBotApiError('msg', 'CODE', 500);
    expect(err).toBeInstanceOf(Error);
  });

  it('should allow undefined details', () => {
    const err = new PayBotApiError('msg', 'CODE', 400);
    expect(err.details).toBeUndefined();
  });
});

describe('getErrorMessage', () => {
  it('should extract message from Error instances', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('should return string values directly', () => {
    expect(getErrorMessage('something broke')).toBe('something broke');
  });

  it('should return "Unknown error" for non-Error, non-string values', () => {
    expect(getErrorMessage(42)).toBe('Unknown error');
    expect(getErrorMessage(null)).toBe('Unknown error');
    expect(getErrorMessage(undefined)).toBe('Unknown error');
    expect(getErrorMessage({ foo: 1 })).toBe('Unknown error');
  });
});

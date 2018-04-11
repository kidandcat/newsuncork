const assert = require('assert');
const app = require('../../src/app');

describe('\'Product\' service', () => {
  it('registered the service', () => {
    const service = app.service('product');

    assert.ok(service, 'Registered the service');
  });
});

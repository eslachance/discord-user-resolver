import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { snoop } from 'snoop';

test.before.each(() => {
  document.body.innerHTML = '';
});

test('Running yarn test works.', () => {
  assert.ok('Now go read the uvu docs');
});

test.after(() => {
  setTimeout(() => {
    process.exit(0);
  }, 0);
});

test.run();

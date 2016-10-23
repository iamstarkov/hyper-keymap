import test from 'ava';
import { capture } from './';

test('capture', t => {
  let storage = {};
  capture('keymap', storage)({ keymap: 'captured' });

  t.is(storage.keymap, 'captured');
});

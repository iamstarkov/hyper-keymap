import test from 'ava';
import R from 'ramda';
import { capture, decorateMenuWith } from './';


test('capture', t => {
  let storage = {};
  capture('keymap', storage)({ keymap: 'captured' });

  t.is(storage.keymap, 'captured');
});

test('decorateMenuWith', t => {
  const menu = [
    { submenu: [ 1, 2 ] },
    { submenu: [ 3, 4 ] }
  ];
  const actual = decorateMenuWith(R.multiply(10))(menu)
  const expected = [
    { submenu: [ 10, 20 ] },
    { submenu: [ 30, 40 ] }
  ];

  t.deepEqual(actual, expected);
});

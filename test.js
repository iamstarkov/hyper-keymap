import test from 'ava';
import R from 'ramda';
import { capture, decorateMenuWith, addCommand } from './';


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

test('addCommand if exists in predefined', t => {
  const predefined = [
    { role: 'about' },
    { label: 'LBL1', command: 'CMD1' },
    { type: 'separator' }
  ];
  const item = { label: 'LBL1', click() {} };

  const actual = addCommand(predefined)(item);
  const expected = { label: 'LBL1', click() {}, command: 'CMD1' };

  t.is(actual.command, expected.command);
});

test('dont addCommand if not exists in predefined', t => {
  const item = { label: 'LBL1', click() {} };

  const actual = addCommand([])(item);
  const expected = { label: 'LBL1', click() {}};

  t.is(actual.command, expected.command);
});

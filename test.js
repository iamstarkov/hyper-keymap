import test from 'ava';
import R from 'ramda';
import { capture, decorateMenuWith, addCommand, bindUserAccelerators } from './';


test('capture', t => {
  let storage = {};
  const config = { keymap: 'captured' };
  capture('keymap', storage)(config);

  t.is(storage.keymap, config.keymap);
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

test('dont bindUserAccelerators if item doesnt have command prop', t => {
  const bindUserAcceleratorsFn = bindUserAccelerators({});
  const items = [
    { role: 'about' },
    { type: 'separator' }
  ];

  const actual = items.map(bindUserAcceleratorsFn);
  const expected = items;

  t.deepEqual(actual, expected);
});

test('bindUserAccelerators: users accelerators have prio over default ones', t => {
  const bindUserAcceleratorsFn = bindUserAccelerators({
    findUserAccelerators: R.always(['A']),
    findDefaultAccelerators: R.always(['B', 'C']),
  });
  const item = { command: 'CMD' };

  const actual = bindUserAcceleratorsFn(item);
  const expected = { command: 'CMD', accelerator: 'A' };

  t.deepEqual(actual, expected);
});

test('bindUserAccelerators: default accelerators are used one there are no user ones', t => {
  const bindUserAcceleratorsFn = bindUserAccelerators({
    findUserAccelerators: R.always([]),
    findDefaultAccelerators: R.always(['B', 'C']),
  });
  const item = { command: 'CMD' };

  const actual = bindUserAcceleratorsFn(item);
  const expected = { command: 'CMD', accelerator: 'B' };

  t.deepEqual(actual, expected);
});

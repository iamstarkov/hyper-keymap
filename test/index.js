import test from 'ava';
import R from 'ramda';
import {
  capture,
  findAccelerators,
  decorateMenuWith,
  addCommand,
  bindUserAccelerators,
  rebindConflictedAccelerators
} from '../';


test('capture', t => {
  let storage = {};
  const config = { keymap: { a: 'b' } };
  capture('keymap', storage)(config);

  t.deepEqual(storage.keymap, { a: 'b' });
});

test('capture undefined keymap results in empty object', t => {
  let storage = {};
  const config = {};
  capture('keymap', storage)(config);

  t.deepEqual(storage.keymap, {});
});

test('findAccelerators', t => {
  const keymap = {
    'CmdOrCtrl+Alt+Left':    'prev-tab',
    'CmdOrCtrl+Alt+Right':   'next-tab',
    'CmdOrCtrl+Shift+Left':  'prev-tab',
    'CmdOrCtrl+Shift+Right': 'next-tab',
  };

  const actual = findAccelerators(keymap, 'next-tab');
  const expected = [ 'CmdOrCtrl+Alt+Right', 'CmdOrCtrl+Shift+Right' ];

  t.deepEqual(actual, expected);
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

test('bindUserAccelerators: ignore item wo/ "command" prop', t => {
  const bindUserAcceleratorsFn = bindUserAccelerators({});
  const items = [
    { role: 'about' },
    { type: 'separator' }
  ];

  const actual = items.map(bindUserAcceleratorsFn);
  const expected = items;

  t.deepEqual(actual, expected);
});

test('bindUserAccelerators: users keymap has prio over default', t => {
  const bindUserAcceleratorsFn = bindUserAccelerators({
    userKeymapFn: R.always({ 'A': 'cmd' }),
    defaultKeymapFn: R.always({ 'B': 'cmd', 'C': 'cmd' }),
  });
  const item = { command: 'cmd' };

  const actual = bindUserAcceleratorsFn(item);
  const expected = { command: 'cmd', accelerator: 'A' };

  t.deepEqual(actual, expected);
});

test('bindUserAccelerators: default keymap is used when there is no suitable user keymap for relevand command', t => {
  const bindUserAcceleratorsFn = bindUserAccelerators({
    userKeymapFn: R.always({}),
    defaultKeymapFn: R.always({ 'B': 'cmd', 'C': 'cmd' }),
  });
  const item = { command: 'cmd' };

  const actual = bindUserAcceleratorsFn(item);
  const expected = { command: 'cmd', accelerator: 'B' };

  t.deepEqual(actual, expected);
});

test('rebindConflictedAccelerators: ignore item wo/ "command" prop', t => {
  const rebindConflictedAcceleratorsFn = rebindConflictedAccelerators({});
  const items = [
    { role: 'about' },
    { type: 'separator' }
  ];

  const actual = items.map(rebindConflictedAcceleratorsFn);
  const expected = items;

  t.deepEqual(actual, expected);
});

test('rebindConflictedAccelerators: use another default accelerator if its conflicted', t => {
  const rebindConflictedAcceleratorsFn = rebindConflictedAccelerators({
    userKeymapFn: R.always({ 'CmdOrCtrl+Alt+Right': 'next-pane' }),
    defaultKeymapFn: R.always({
      'CmdOrCtrl+Alt+Right':   'next-tab',
      'ctrl+tab':              'next-tab',
      'CmdOrCtrl+Shift+Right': 'next-tab',
      'CmdOrCtrl+Shift+]':     'next-tab',
    }),
  });
  const items = [
    { command: 'next-tab', accelerator: 'CmdOrCtrl+Alt+Right' },
    { command: 'next-pane', accelerator: 'CmdOrCtrl+Alt+Right' },
  ];

  const actual = items.map(rebindConflictedAcceleratorsFn);
  const expected = [
    { command: 'next-tab', accelerator: 'ctrl+tab' },
    { command: 'next-pane', accelerator: 'CmdOrCtrl+Alt+Right' },
  ];

  t.deepEqual(actual, expected);
});

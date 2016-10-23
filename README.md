# hyper-keymap

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> Hotkeys management for Hyper

## Install

Open your Hyper preferences and add `hyper-keymap` to plugin list:

```js
plugins: [
  'hyper-keymap'
],
```

Or use [hpm][hpm]

    npm install -g hpm
    hpm i hyper-keymap


[hpm]: https://npm.im/hpm-cli

## Usage

There is a [default keymap](./default-keymap.js), which is used by Hyper.

In order to change hotkeys you are unhappy with, add `keymap` object to your config:

```js
module.exports = {
  config: {

    // other configuration

    keymap: {
      // just examples, see below for detailed explanation
      'CmdOrCtrl+Alt+Left':  'prev-pane',
      'CmdOrCtrl+Alt+Right': 'next-pane',
    },
  },

  plugins: [
    'hyper-keymap'
    // you can have another plugins as well
  ],
};
```

Keymap is an object of Electron's accelerator and Hyper's command.

```js
keymap: {
  // 'accelerator'    :  'Hyper command'
  'CmdOrCtrl+Alt+Left':  'prev-pane',
}
```

Your keymap has prio over default one.

## Electron's accelerators

It is a way to define keyboard shortcuts.

Accelerators can contain multiple modifiers and key codes, combined by the `+` character.

Examples:

* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

Check out Electron's [accelerators][elacc] documentation.

[elacc]: http://electron.atom.io/docs/api/accelerator/

## List of supported Hyper commands

* `show-settings`
* `new-window`
* `new-tab`
* `split-vertical`
* `split-horizontal`
* `close`
* `close-window`
* `clear`
* `show-settings`
* `reload`
* `reload-full`
* `toggle-devtools`
* `zoom-reset`
* `zoom-in`
* `zoom-out`
* `update-plugins`
* `prev-tab`
* `next-tab`
* `prev-pane`
* `next-pane`

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/hyper-keymap
[npm-image]: https://img.shields.io/npm/v/hyper-keymap.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/hyper-keymap
[travis-image]: https://img.shields.io/travis/iamstarkov/hyper-keymap.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/hyper-keymap
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/hyper-keymap.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/hyper-keymap
[depstat-image]: https://david-dm.org/iamstarkov/hyper-keymap.svg?style=flat-square

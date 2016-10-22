# hyper-keymap

> Hotkeys management for Hyper

## Install

Open your Hyper preferences and add `hyper-keymap` to plugin list:

```js
plugins: [
  'hyper-keymap'
],
```

Or with [hpm][hpm]

    npm install -g hpm
    hpm i hyper-keymap


[hpm]: https://npm.im/hpm-cli

## Usage

If you want to change some parts of [default keymap](./keymap.js),
open your Hyper preferences and add `keymap` object to your config,
so it looks like this:

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

You can read about more about [menu][elmenu] and [accelerators][elacc] Electron's docs.

List of supported Hyper commands:

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


[elmenu]: http://electron.atom.io/docs/api/menu/
[elacc]: http://electron.atom.io/docs/api/accelerator/



## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

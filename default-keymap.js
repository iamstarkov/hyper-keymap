const isMac = process.platform === 'darwin';

module.exports = {
  'CmdOrCtrl+,':       'show-settings',

  'CmdOrCtrl+N':       'new-window',
  'CmdOrCtrl+T':       'new-tab',

  [isMac
    ? 'CmdOrCtrl+D'
    : 'Ctrl+Shift+E']: 'split-vertical',
  [isMac
    ? 'CmdOrCtrl+Shift+D'
    : 'Ctrl+Shift+O']: 'split-horizontal',

  'CmdOrCtrl+W':       'close',
  'CmdOrCtrl+shift+W': 'close-window',

  'CmdOrCtrl+K':       'clear',

  'CmdOrCtrl+R':       'reload',
  'CmdOrCtrl+Shift+R': 'reload-full',

  [isMac
    ? 'Alt+Command+I'
    : 'Ctrl+Shift+I']: 'toggle-devtools',

  'CmdOrCtrl+0':       'zoom-reset',
  'CmdOrCtrl+plus':    'zoom-in',
  'CmdOrCtrl+-':       'zoom-out',

  'CmdOrCtrl+Shift+U': 'update-plugins',

  'CmdOrCtrl+Alt+Left':    'prev-tab',
  'CmdOrCtrl+Alt+Right':   'next-tab',

  'ctrl+shift+tab':        'prev-tab',
  'ctrl+tab':              'next-tab',

  'CmdOrCtrl+Shift+Left':  'prev-tab',
  'CmdOrCtrl+Shift+Right': 'next-tab',

  'CmdOrCtrl+Shift+[':     'prev-tab',
  'CmdOrCtrl+Shift+]':     'next-tab',

  'Ctrl+Shift+Alt+Tab': 'prev-pane',
  'Ctrl+Alt+Tab':       'next-pane',

  /**
   * Wait until relevant commands will be implemented in Hyper's rpc
  'CmdOrCtrl+1': 'tab-show-0',
  'CmdOrCtrl+2': 'tab-show-1',
  'CmdOrCtrl+3': 'tab-show-2',
  'CmdOrCtrl+4': 'tab-show-3',
  'CmdOrCtrl+5': 'tab-show-4',
  'CmdOrCtrl+6': 'tab-show-5',
  'CmdOrCtrl+7': 'tab-show-6',
  'CmdOrCtrl+8': 'tab-show-7',
  'CmdOrCtrl+9': 'tab-show-last',

  'alt+left':      'move-word-left'
  'alt+right':     'move-word-right'
  'alt+backspace': 'delete-word-left'
  'alt+del':       'delete-word-right'

  'CmdOrCtrl+backspace': 'delete-line'
  'CmdOrCtrl+left':      'move-to-line-start'
  'CmdOrCtrl+right':     'move-to-line-end'
  'CmdOrCtrl+a':         'select-all'
  */
};

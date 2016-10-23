const isMac = process.platform === 'darwin';

module.exports = [{
  label: 'Preferences...',
  command: 'show-settings',
}, {
  label: 'New Window',
  command: 'new-window',
}, {
  label: 'New Tab',
  command: 'new-tab',
}, {
  label: 'Split Vertically',
  command: 'split-vertical',
}, {
  label: 'Split Horizontally',
  command: 'split-horizontal',
}, {
  label: 'Close',
  command: 'close',
}, {
  label: isMac ? 'Close Terminal Window' : 'Quit',
  command: 'close-window',
}, {
  label: 'Clear',
  command: 'clear',
}, {
  label: 'Preferences...',
  command: 'show-settings',
}, {
  label: 'Reload',
  command: 'reload',
}, {
  label: 'Full Reload',
  command: 'reload-full',
}, {
  label: 'Toggle Developer Tools',
  command: 'toggle-devtools',
}, {
  label: 'Reset Zoom Level',
  command: 'zoom-reset',
}, {
  label: 'Zoom In',
  command: 'zoom-in',
}, {
  label: 'Zoom Out',
  command: 'zoom-out',
}, {
  label: 'Update All Now',
  command: 'update-plugins',
}, {
  label: 'Show Previous Tab',
  command: 'prev-tab',
}, {
  label: 'Show Next Tab',
  command: 'next-tab',
}, {
  label: 'Select Previous Pane',
  command: 'prev-pane',
}, {
  label: 'Select Next Pane',
  command: 'next-pane',
}];

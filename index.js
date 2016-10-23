const R = require('ramda');
const defaultKeymap = require('./default-keymap');
const predefinedMenuCommands = require('./predefined-menu-commands');

let storage = {};

const capture = (key, _) => config => {
  _[key] = config[key] || {};
};

const acceleratorsReducerBy = inputCommand =>
  (accelerators, [accelerator, command]) =>
    accelerators.concat((inputCommand === command) ? [accelerator] : []);

const findAccelerators = R.curry(
  (keymap, inputCommand) =>
    R.toPairs(keymap).reduce(acceleratorsReducerBy(inputCommand) , [])
);

const addCommand = predefined => {
  const labelsToPredefine = R.pluck('label', predefined);
  const findCommand = item => R.pipe(
    R.find(R.propEq('label', item.label)),
    R.prop('command')
  )(predefined);

  return item => {
    if (!R.contains(item.label, labelsToPredefine)) {
      return item;
    }
    return R.merge(item, { command: findCommand(item) });
  };
}

const bindUserAccelerators = ({ userKeymapFn, defaultKeymapFn }) => item => {
  const { command } = item;
  if (!command) {
    return item;
  }

  const userAccelerator = findAccelerators(userKeymapFn(), command)[0];
  const defaultAccelerator = findAccelerators(defaultKeymapFn(), command)[0];

  return R.merge(item, {
    accelerator: (userAccelerator || defaultAccelerator),
  });
};

const rebindConflictedAccelerators = item => {
  const { accelerator, command } = item;
  if (!command) {
    return item;
  }

  const userAccelerators = R.keys(storage.keymap);
  const userCommands = R.values(storage.keymap);
  const didUserUseThisAccelerator = userAccelerators.includes(accelerator);
  const didUserRedefineCommand = userCommands.includes(command);
  const isConflicted = didUserUseThisAccelerator && !didUserRedefineCommand;

  if (!isConflicted) {
    return item;
  }

  const findDefaultAccelerators = findAccelerators(defaultKeymap);

  const defaultAccelerators = findDefaultAccelerators(command);
  const defaultAcceleratorsWithoutUserOnes = R.without(userAccelerators, defaultAccelerators);
  const [newAccelerator,] = defaultAcceleratorsWithoutUserOnes;

  return R.merge(item, { accelerator: newAccelerator });
}

const decorateMenuWith = fn => R.map(R.over(
  R.lensProp('submenu'),
  R.map(fn)
));

module.exports = {
  // helpers
  capture,
  decorateMenuWith,
  addCommand,
  bindUserAccelerators,

  // Hyper's stuff
  decorateConfig: R.tap(capture('keymap', storage)),
  decorateMenu: decorateMenuWith(R.pipe(
    addCommand(predefinedMenuCommands),
    bindUserAccelerators({
      userKeymapFn: R.always(storage.keymap),
      defaultKeymapFn: R.always(defaultKeymap),
    }),
    rebindConflictedAccelerators
  ))
}

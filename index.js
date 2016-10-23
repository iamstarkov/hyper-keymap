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

const findAccelerators = keymap => inputCommand => {
  return R.toPairs(keymap).reduce(acceleratorsReducerBy(inputCommand) , []);
}

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

const bindAccelerators = item => {
  const { command } = item;
  if (!command) {
    return item;
  }
  const findUserAccelerators = findAccelerators(storage.keymap);
  const findDefaultAccelerators = findAccelerators(defaultKeymap);

  const [userAccelerator,] = findUserAccelerators(command);
  const [defaultAccelerator,] = findDefaultAccelerators(command);

  const accelerator = userAccelerator ? userAccelerator : defaultAccelerator;
  return R.merge(item, { accelerator });
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

const decorateMenu = R.map(R.over(
  R.lensProp('submenu'),
  R.map(R.pipe(
    addCommand(predefinedMenuCommands),
    bindAccelerators,
    rebindConflictedAccelerators
  ))
));

module.exports = {
  capture,
  decorateConfig: R.tap(capture('keymap', storage)),
  decorateMenu,
}

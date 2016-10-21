const R = require('ramda');
const defaultKeymap = require('./keymap');

let userKeymap;
const decorateConfig = config => {
  userKeymap = config.keymap || {};
  return config;
}

const acceleratorsReducerBy = inputCommand =>
  (accelerators, [accelerator, command]) =>
    accelerators.concat((inputCommand === command) ? [accelerator] : []);

const findAccelerators = keymap => inputCommand => {
  return R.toPairs(keymap).reduce(acceleratorsReducerBy(inputCommand) , []);
}

const decorateMenu = menus => {
  const findUserAccelerators = findAccelerators(userKeymap);
  const findDefaultAccelerators = findAccelerators(defaultKeymap);

  const bindAccelerators = item => {
    const { command } = item;
    if (!command) {
      return item;
    }
    const [userAccelerator,] = findUserAccelerators(command);
    const [defaultAccelerator,] = findDefaultAccelerators(command);

    const accelerator = userAccelerator ? userAccelerator : defaultAccelerator;
    return R.merge(item, { accelerator });
  };

  const rebindConflictedAccelerators = item => {
    const { label, accelerator, command } = item;
    if (!command) {
      return item;
    }

    const userAccelerators = R.keys(userKeymap);
    const userCommands = R.values(userKeymap);
    const didUserUseThisAccelerator = userAccelerators.includes(accelerator);
    const didUserRedefineCommand = userCommands.includes(command);
    const isConflicted = didUserUseThisAccelerator && !didUserRedefineCommand;

    if (!isConflicted) {
      return item;
    }

    const defaultAccelerators = findDefaultAccelerators(command);
    const defaultAcceleratorsWithoutUserOnes = R.without(userAccelerators, defaultAccelerators);
    const [newAccelerator,] = defaultAcceleratorsWithoutUserOnes;

    return R.merge(item, { accelerator: newAccelerator });
  }

  return menus.map(R.over(
    R.lensProp('submenu'),
    R.map(R.pipe(
      bindAccelerators,
      rebindConflictedAccelerators
    ))
  ));
}

module.exports = {
  decorateConfig,
  decorateMenu,
}

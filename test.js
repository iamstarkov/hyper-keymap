import test from 'ava';
import { id } from './';

test('keymap', t => {
  t.is(id(1), 1);
});

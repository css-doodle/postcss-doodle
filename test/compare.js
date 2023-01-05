import assert from 'assert';
import postcss from 'postcss';
import plugin from '../src/index.js';

async function render(input) {
  const { css } = await postcss()
    .use(plugin)
    .process(input, { from: null })
  return css;
}

export default async function compare(code, result) {
  const input = await render(code);
  assert.equal(input.trim(), result.trim());
}

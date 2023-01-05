const valueParser = require('postcss-value-parser');

const KEYWORDS = ['@svg', '@shape'];

module.exports = plugin;
plugin.postcss = true;

function plugin() {
  return {
    postcssPlugin: "postcss-doodle",
    async Declaration(decl) {
      try {
        let parsed = valueParser(decl.value);
        parsed.nodes = await transformNodes(parsed.nodes);
        decl.value = parsed.toString();
      } catch (e) {
        // fail silently
      }
    }
  }
}

async function transformNodes(nodes) {
  let { svg, shape} = await import('css-doodle/generator');
  return nodes.map(node => {
    if (node.type === 'function' && KEYWORDS.includes(node.value)) {
      const { result, args } = getInput(node.nodes);
      node.type = 'word';
      if (node.value === '@svg') {
        node.value = wrapSVG(svg(result));
      }
      if (node.value === '@shape') {
        node.value = shape(...args);
      }
    }
    return node;
  });
}

function getInput(nodes) {
  let result = '', argResult = '';
  let args = [];
  for (let node of nodes) {
    let nested = (node.type === 'function' && Array.isArray(node.nodes));
    if (nested) {
      let value = `${node.value}(${getInput(node.nodes).result})`;
      result += value;
      argResult += value;
    } else {
      if (node.type === 'div' && node.value === ',') {
        args.push(argResult);
        argResult = '';
      } else {
        argResult += node.value;
      }
      result += node.value;
    }
  }
  if (argResult.length) {
    args.push(argResult);
  }
  return { result, args };
}

function wrapSVG(input) {
  return `url(data:image/svg+xml;utf8,${ encodeURIComponent(input) })`;
}


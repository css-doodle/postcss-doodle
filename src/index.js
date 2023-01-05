import { svg, shape } from 'css-doodle/generator';
import valueParser from 'postcss-value-parser';

const KEYWORDS = ['@svg', '@shape'];

export default function plugin() {
  return {
    postcssPlugin: "postcss-doodle",
    Declaration(decl) {
      try {
        let parsed = valueParser(decl.value);
        parsed.nodes = transformNodes(parsed.nodes);
        decl.value = parsed.toString();
      } catch (e) {
        // fail silently
      }
    }
  }
}

plugin.postcss = true;

function transformNodes(nodes) {
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

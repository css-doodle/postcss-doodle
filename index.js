import { svg, shape } from 'css-doodle/generator';
import valueParser from 'postcss-value-parser';

export default function plugin() {
  return {
    postcssPlugin: "postcss-doodle",
    Declaration(decl) {
      let parsed = valueParser(decl.value);
      for (let node of parsed.nodes) {
        if (node.type === 'function' && isKeyword(node.value)) {
          let { result, args } = getInput(node.nodes);
          node.type = 'word'
          if (node.value === '@svg') {
            node.value = wrapSVG(svg(result));
          }
          if (node.value === '@shape') {
            node.value = shape(...args);
          }
        }
      }
      decl.value = parsed.toString();
    }
  }
}

plugin.postcss = true;

function getInput(nodes) {
  let result = '', argResult = '';
  let args = [];
  for (let node of nodes) {
    let nested = (node.type === 'function' && Array.isArray(node.nodes));
    if (nested) {
      let value = `${node.value}(${getInput(node.nodes).result})`;
      result += value;
      argResult += value;
    } else  {
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

function isKeyword(name) {
  return name === '@svg' || name === '@shape';
}

function wrapSVG(input) {
  return `url(data:image/svg+xml;utf8,${ encodeURIComponent(input) })`;
}

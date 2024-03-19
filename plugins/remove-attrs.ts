/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FilterPattern, createFilter } from '@rollup/pluginutils';
import { generate } from 'astring';
import { walk } from 'estree-walker';
import { SourceMapGenerator } from 'source-map';
import type { Plugin } from 'vite';

interface Options {
  attributes: string[];
  include?: FilterPattern;
  exclude?: FilterPattern;
}

// https://github.com/l-mbert/vite-plugin-react-remove-attributes
export default function CustomVitePluginReactRemoveAttributes({
  include = [/\.[cm]?[tj]sx?$/],
  exclude = ['**/node_modules/**'],
  attributes,
}: Options): Plugin {
  const filterValidFile = createFilter(include, exclude);

  return {
    name: 'vite-plugin-react-remove-attributes',
    apply: 'build',
    transform(src: string, id: string) {
      if (process.env.NODE_ENV === 'production') {
        if (filterValidFile(id)) {
          const ast = this.parse(src);

          // remove nodes that have the specified attributes
          walk(ast, {
            enter(node, _parent, _prop, _index) {
              if (
                node.type === 'Property' &&
                'key' in node &&
                node.key.type == 'Literal' &&
                attributes.includes(node.key.value as string)
              ) {
                this.remove();
              }
            },
          });

          // build new source map and code
          const map = new SourceMapGenerator({ file: id });
          const formattedCode = generate(ast, { sourceMap: map });
          return { code: formattedCode, map: map.toString() };
        }
      }

      // null map because, if it gets down here, that means there were no changes to be made
      return { code: src, map: null };
    },
  };
}

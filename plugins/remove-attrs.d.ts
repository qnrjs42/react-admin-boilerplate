// Import necessary types from dependencies
import { FilterPattern } from '@rollup/pluginutils';
import { Plugin } from 'vite';

// Declare an interface for the plugin options
export interface Options {
  attributes: string[];
  include?: FilterPattern;
  exclude?: FilterPattern;
}

// Declare the function type for the custom plugin function
export default function CustomVitePluginReactRemoveAttributes(options: Options): Plugin;

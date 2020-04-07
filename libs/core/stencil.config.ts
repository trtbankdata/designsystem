import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'kirby',
  plugins: [sass({ injectGlobalPaths: ['../designsystem/src/lib/scss/utils'] })],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@kirbydesign/core',
      directivesProxyFile: '../angular/src/lib/components/proxies.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: '../../dist/libs/core/dist',
    },
    { type: 'experimental-dist-module', dir: '../../dist/libs/core/dist/module' },
    { type: 'docs-readme' },
    { type: 'docs-json', file: './stuff.json' },
    // {
    //   type: 'www',
    //   serviceWorker: null, // disable service workers
    // },
  ],
  // testing: {
  //   testPathIgnorePatterns: ['/node_modules/', '/libs/designsystem/.*', '/apps/.*'],
  // },
};

#!/usr/bin/env node
'use strict';

// Import required packages
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const cpx = require('cpx');

// Derive arguments from CLI (all dashes are stripped, eg:
//    --help -> args.help
//    -help -> args.help
//    --dry-run -> args.dryrun
const args = {};
process.argv.forEach(arg => {
   args[arg.replace(/-+/g, '')] = true;
});

function log(data) {
    _l('info', data);
}

function error(data) {
    _l('error', data);
}

function _l(level, data) {
    if (args.verbose) {
        console.log(`[${level.toUpperCase()}] ${data}`);
    }
}

function pathOf(partial) {
    return path.resolve(__dirname, partial);
}

function copySource() {
    log('Copying files...');
    let dest = pathOf('../dist-lib');
    // Copy README.md
    cpx.copySync('readme.md', dest);

    // Copy package.json (if not already produced by ng-packagr)
    if (!fs.existsSync()) {
      cpx.copySync('projects/kirby/package.json', dest);
    }

    // Copy source files
    cpx.copySync('projects/kirby/src/**/!(*.spec.ts)', dest);
}

function processPackageJson(cfg) {
    const dependencies = [
        '@ionic/angular',
        'highcharts',
        'moment',
        'nativescript-feedback',
        'nativescript-webview-interface',
        'nativescript-windowed-modal',
        'nativescript-checkbox',
        'nativescript-ui-listview',
    ];
    log(`Copying dependencies meta-data for: ${dependencies.join(', ')}`);

    // Read package.json files
    const rootPkgJson = JSON.parse(cfg.src);
    const pkgJson = JSON.parse(cfg.dest);

    // Copy dependencies (getting version from package.json in root)
    dependencies.forEach(name => {
        const version = rootPkgJson.dependencies[name];
        pkgJson.dependencies[name] = version;
    });
    // Copy version (from package.json in root)
    log(`Copying version information: ${rootPkgJson.version}`);
    pkgJson.version = rootPkgJson.version;

    log('New package.json file contents:\n' + JSON.stringify(pkgJson, null, 2));
    return pkgJson;
}

function deploy() {
    if (!args.nodeploy) {
        const result = cp.spawnSync('npm', ['publish', pathOf('../dist-lib')]);
        if (result.status !== 0) {
            error('Unable to publish package');
            error('stdout: ' + result.stdout);
            error('stderr: ' + result.stderr);
            process.exitCode = 1;
        }
    }
}

// Main flow of script
if (args.help) {
    console.log('./publish.js [...<args>]');
    console.log();
    console.log('Arguments:');
    console.log('  --help:          Displays this screen');
    console.log('  --verbose:       Provides extra information about the script execution');
    console.log('  --no-deploy:     Executes the logic of this script, but does not deploy to npmjs.org');
    console.log();
} else {
    // Copy source
    copySource();

    // Process package.json
    let srcPath = pathOf('../package.json');
    let destPath = pathOf('../dist-lib/package.json');
    const src = fs.readFileSync(srcPath, 'utf-8');
    const dest = fs.readFileSync(destPath, 'utf-8');
    log(`Processing: ${srcPath}`);
    const packageJson = processPackageJson({ src, dest});

    // Write package.json
    log(`Writing package.json file to: ${destPath}`);
    fs.writeFileSync(destPath, JSON.stringify(packageJson, null, 2));

    // Publish to npm registry
    deploy();
}

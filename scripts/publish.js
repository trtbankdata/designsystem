#!/usr/bin/env node
'use strict';

// Import required packages
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const cpx = require('cpx');

// Dependencies
const dependencies = {
    native: [
        'nativescript-feedback',
        'nativescript-webview-interface',
        'nativescript-windowed-modal',
        'nativescript-checkbox',
        'nativescript-ui-listview',
    ],
    web: [
        '@ionic/angular',
    ],
    shared: [
        //'@angular/common',
        //'@angular/core',
        'highcharts',
        'moment',
    ],
};

// Commands
const CODE_SHARING_CMD = 'code-sharing';
const WEB_ONLY_CMD = 'web-only';

// Derive command being run
const command = process.argv.length > 1 ? process.argv[2] : '';
if ([CODE_SHARING_CMD, WEB_ONLY_CMD].indexOf(command) < 0) {
    fatal(`Please specify a command to execute - either: "${CODE_SHARING_CMD}" or "${WEB_ONLY_CMD}"\n`);
    printUsage();
    process.exit(255);
}

// Derive arguments from CLI (all dashes are stripped, eg:
//    --help -> args.help
//    -help -> args.help
//    --dry-run -> args.dryrun
const args = {};
process.argv.forEach(arg => {
    args[arg.replace(/-+/g, '')] = true;
});

// Derive output directory
let outputDir = 'dist-lib';
if (command === WEB_ONLY_CMD) {
    outputDir += '-webonly';
}

function log(data) {
    _l('info', data);
}

function error(data) {
    _l('error', data);
}

function fatal(data) {
    console.log(`[FATAL] ${data}`);
}

function _l(level, data) {
    if (args.verbose) {
        console.log(`[${level.toUpperCase()}] ${data}`);
    }
}

function pathOf(partial) {
    return path.resolve(__dirname, partial);
}

function copySource(overwritePackageJson = true) {
    let dest = pathOf(`../${outputDir}`);
    log(`Copying files (to ${dest})...`);

    // Copy README.md
    cpx.copySync('readme.md', dest);

    // Copy package.json
    if (overwritePackageJson) {
        cpx.copySync('projects/kirby/package.json', dest);
    }

    // Copy source files
    cpx.copySync('projects/kirby/src/**/!(*.spec.ts)', dest);
}

function processPackageJson(cfg) {
    // Determine which dependencies to copy meta-data for (version)
    const deps = [...dependencies.shared];
    switch (command) {
        case CODE_SHARING_CMD:
            deps.push(...dependencies.native);
            deps.push(...dependencies.web);
            break;
        case WEB_ONLY_CMD:
            deps.push(...dependencies.web);
            break;
    }
    log(`Copying dependencies meta-data for: ${deps.join(', ')}`);

    // Read package.json files
    const rootPkgJson = JSON.parse(cfg.src);
    const pkgJson = JSON.parse(cfg.dest);

    // Construct new dependencies (getting version from package.json in root)
    const newDependencies = {};
    deps.forEach(name => {
        newDependencies[name] = rootPkgJson.dependencies[name];
    });
    pkgJson.dependencies = newDependencies;

    // Copy version (from package.json in root)
    log(`Copying version information: ${rootPkgJson.version}`);
    pkgJson.version = rootPkgJson.version;

    // Make adjustments if producing web-only version of library
    if (command === WEB_ONLY_CMD) {
        // Change name of package
        pkgJson.name += '-webonly';
        log(`Changing package name to: ${pkgJson.name}`);

        // Remove typescript "types"-property (proper bundling is handled by ng-packagr)
        delete pkgJson.types;
        log('Removing "types"-property');
    }

    log('New package.json file contents:\n' + JSON.stringify(pkgJson, null, 2));
    return pkgJson;
}

function deploy() {
    if (!args.nodeploy) {
        const result = cp.spawnSync('npm', ['publish', pathOf(`../${outputDir}`)]);
        if (result.status !== 0) {
            error('Unable to publish package');
            error('stdout: ' + result.stdout);
            error('stderr: ' + result.stderr);
            process.exitCode = 1;
        }
    }
}

function printUsage() {
    console.log('./publish.js <command> [...<args>]');
    console.log();
    console.log('Commands:');
    console.log(`  ${CODE_SHARING_CMD}:    Builds code-sharing version of library`);
    console.log(`  ${WEB_ONLY_CMD}:        Builds version of library, only appropriate for web-based projects`);
    console.log();
    console.log('Arguments:');
    console.log('  --help:          Displays this screen');
    console.log('  --verbose:       Provides extra information about the script execution');
    console.log('  --no-deploy:     Executes the logic of this script, but does not deploy to npmjs.org');
    console.log();
}

// Main flow of script
if (args.help) {
    printUsage();
} else {
    // Copy source
    copySource();

    // Process package.json
    let srcPath = pathOf('../package.json');
    let destPath = pathOf(`../${outputDir}/package.json`);
    const src = fs.readFileSync(srcPath, 'utf-8');
    const dest = fs.readFileSync(destPath, 'utf-8');
    log(`Processing: ${srcPath}`);
    const packageJson = processPackageJson({src, dest});

    // Write package.json
    log(`Writing package.json file to: ${destPath}`);
    fs.writeFileSync(destPath, JSON.stringify(packageJson, null, 2));

    // Publish to npm registry
    deploy();
}

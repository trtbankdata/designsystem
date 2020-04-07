const { GenerateMocks } = require('../tools/generate-mocks/dist/generate-mocks');
const proxyComponentsMetaData = require('../libs/core/stuff.json');

const inputPath = './libs/angular/src/lib/';
const outputPath = './libs/angular/testing-base/src/lib/';
const subFolder = '/components/';
new GenerateMocks().renderMocks(inputPath, outputPath, subFolder, proxyComponentsMetaData);

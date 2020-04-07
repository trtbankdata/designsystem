const { GenerateMocks } = require('../tools/generate-mocks/dist/generate-mocks');

const inputPath = './libs/angular/src/lib/';
const outputPath = './libs/angular/testing-base/src/lib/';
const subFolder = '/components/';
new GenerateMocks().renderMocks(inputPath, outputPath, subFolder);

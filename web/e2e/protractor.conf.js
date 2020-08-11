// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
process.env.CHROME_BIN = process.env.CHROME_BIN || require('puppeteer').executablePath();

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,

  multiCapabilities: [{
    'browserName': 'chrome',
    binary: process.env.CHROME_BIN,
    'chromeOptions' : {
        args: ['--lang=en',
               '--start-fullscreen',
               '--window-size=1838,650',
              '--headless']
    },
 
    specs: ['**/**.e2e-spec.ts'],
    exclude: ['**/**.mobile.e2e-spec.ts']
 },{
    'browserName': 'chrome',
    binary: process.env.CHROME_BIN,
    'chromeOptions' : {
     args: ['--lang=en',
            '--window-size=350,650',
            '--headless']
    },
 
    specs: ['**/**.mobile.e2e-spec.ts']
    // and so on
 }],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};

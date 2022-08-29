
username= process.env.LT_USERNAME,
accessKey=  process.env.LT_ACCESS_KEY,

exports.config = {
  'specs': ['../specs/single.js'],

  seleniumAddress: 'https://'+ 'vishnurv2' +':'+ '2dEK8rin7XC3cChRqccFoMlcC9FwPNloQdqV9c4y7vFUAnAB18'  +'@hub.lambdatest.com/wd/hub',

  'capabilities': {
    'build': process.env.LT_BUILD_NAME,
    'browserName': 'chrome',
    'version':'latest',
    'platform': 'WIN10',
    'video': true,
    'network': true,
    'console': true,
    'visual': true,
    'tunnel': true
  },
  onPrepare: () => {

    myReporter = {
        specStarted: function(result) {
          specStr= result.id
          spec_id = parseInt(specStr[specStr.length -1])
          browser.getProcessedConfig().then(function (config) {
            var fullName = config.specs[spec_id];
            //var fileName = fullName.substring(fullName.lastIndexOf('/')+1);
            browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())
          });
        }
      };
      jasmine.getEnv().addReporter(myReporter);
  },
  onComplete: () => {
    browser.quit();
  }



};

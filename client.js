const config = require('./config.js')();
const exec = require('child_process').exec;
const fs = require('fs');

exec('sls info -v',
  function (error, stdout, stderr) {
  	var serviceUrl = '';
  	var serviceEndPoint = '';
    var lines = stdout.split("\n");
    for (line of lines) {
    	if (line.startsWith('ServiceEndpoint')) {
    		serviceUrl = line.replace('ServiceEndpoint: ', '');
    		serviceEndPoint = serviceUrl.replace('https://', '');
    		serviceEndPoint = serviceEndPoint.replace(/\..*$/, '');
    	}
    }
    console.log(serviceEndPoint);
		var clientConfig = {
  		poolId: config.poolId,
  		appClientId: config.appClientId,
  		urls: {
    		tasks: serviceUrl+'/tasks'
  		}
		}

		fs.writeFile("web/WebAppConfig.js", "const WebAppConfig = "
			+ JSON.stringify(clientConfig, null, 2) + ";", ()=>{});

		fs.writeFile("test.sh", "open 'https://s.codepen.io/webdesign/debug/ejjEJG?"
			+ "stage="+config.stage
			+ "&region="+config.region
			+ "&poolId="+config.poolId
			+ "&appClientId="+config.appClientId
			+ "&serviceEndPoint="+serviceEndPoint
			+ "&resource="+"debug"
			+ "&resource="+"tasks'", ()=>{});
});
const config = require('./config.js')();
const exec = require('child_process').exec;
const fs = require('fs');

exec('sls info -v',
  function (error, stdout, stderr) {
  	var serviceUrl = '';
  	var serviceEndPoint = '';

    // get deployed service end point
    var lines = stdout.split("\n");
    for (line of lines) {
    	if (line.startsWith('ServiceEndpoint')) {
    		serviceUrl = line.replace('ServiceEndpoint: ', '');
    		serviceEndPoint = serviceUrl.replace('https://', '');
    		serviceEndPoint = serviceEndPoint.replace(/\..*$/, '');
    	}
    }

		// create web app config file
		var clientConfig = {
  		poolId: config.poolId,
  		appClientId: config.appClientId,
  		urls: {
    		tasks: serviceUrl+'/tasks'
  		}
		}
		fs.writeFile("web/WebAppConfig.js", "const WebAppConfig = "
			+ JSON.stringify(clientConfig, null, 2) + ";", ()=>{});

		// create URL for quick unit test
		var cmd = "open 'https://s.codepen.io/webdesign/debug/ejjEJG?"
			+ "stage="+config.stage
			+ "&region="+config.region
			+ "&poolId="+config.poolId
			+ "&appClientId="+config.appClientId
			+ "&serviceEndPoint="+serviceEndPoint
			+ "&resource="+"debug"
			+ "&resource="+"tasks'";

		if (process.argv[2] == 'test')
			console.log(cmd);

		if (process.argv[2] == 'web')
			console.log("open 'web/index.html'");

		// move web client to s3
		if (process.argv[2] == 's3') {
			console.log('aws s3 sync web s3://my-bucket --acl public-read')
			// console.log('aws s3api put-object --bucket aws-sls-todo-dev --key index.html --body web/index.html --acl public-read --content-type text/html')
			// create bucket - aws s3 mb s3://bucket-name
			// remove bucket - aws s3 rb s3://bucket-name --force
			// sync files - aws s3 sync web s3://my-bucket --acl public-read
		}

		if (!process.argv[2]) {
			console.log('run unit test - node client.sh test | sh');
			console.log('run web client - node client.sh web | sh');
			console.log('upload web client to s3 - node client.sh s3 | sh');
		}

		// move web client to s3
		// aws s3api put-object --bucket aws-sls-todo-dev --key index.html --body web/index.html --acl public-read --content-type text/html		
});
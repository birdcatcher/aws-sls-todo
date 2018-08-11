# echo https://s.codepen.io/webdesign/debug/ejjEJG?
node config.js
cat WebAppConfig.js > web/WebAppConfig.js 
region=$(node config.js | grep 'region' | sed 's/region=//')
sed -i '' "s/REGION/${region}/g" web/WebAppConfig.js
stage=$(node config.js | grep 'stage' | sed 's/stage=//')
sed -i '' "s/STAGE/${stage}/g" web/WebAppConfig.js
poolid=$(node config.js | grep 'poolId' | sed 's/poolId=//')
sed -i '' "s/POOLID/${poolid}/g" web/WebAppConfig.js
appclientid=$(node config.js | grep 'appClientId' | sed 's/appClientId=//')
sed -i '' "s/APPCLIENTID/${appclientid}/g" web/WebAppConfig.js
endpoint=$(sls info -v | grep 'ServiceEndpoint' | sed 's/ServiceEndpoint: https:\/\///' | sed 's/\(.*\)\.execute.*$/\1/')
sed -i '' "s/ENDPOINT/${endpoint}/g" web/WebAppConfig.js
sls info -v | grep 'ServiceEndpoint' | sed 's/ServiceEndpoint: https:\/\//serviceEndPoint=/' | sed 's/\(.*\)\.execute.*$/\1/'
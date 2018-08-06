echo https://s.codepen.io/webdesign/debug/ejjEJG?
node config.js
sls info -v | grep 'ServiceEndpoint' | sed 's/ServiceEndpoint: https:\/\//serviceEndPoint=/' | sed 's/\(.*\)\.execute.*$/\1/'
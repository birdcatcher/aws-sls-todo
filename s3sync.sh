aws s3api put-object --bucket aws-sls-todo-dev --key index.html --body web/index.html --acl public-read --content-type text/html
open https://s3.amazonaws.com/aws-sls-todo-dev/index.html
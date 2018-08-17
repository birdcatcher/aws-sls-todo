const stage = "dev";

const configs = {
	dev: {
		stage: "dev",
		region: "us-east-1",
	  poolId: "us-east-1_AqjJCqJRQ",
	  appClientId: "6og7huqnvfqi217ih1mvmif9sk",
	  userPoolArn: "arn:aws:cognito-idp:us-east-1:896299825733:userpool/us-east-1_AqjJCqJRQ",
	  tableName: "aws-sls-todo-dev",
	  tableArn: "arn:aws:dynamodb:us-east-1:896299825733:table/aws-sls-todo-dev",
	  tableReadUnits: 5,
	  tableWriteUnits: 5,
	  indexReadUnits: 5,
	  indexWriteUnits: 5,
	  bucketName: "aws-sls-todo-dev",
	  bucketArn: "arn:aws:s3:::aws-sls-todo-dev"
	},
	test: {
		stage: "test",
		region: "us-east-1",
	  poolId: "us-east-1_AqjJCqJRQ",
	  appClientId: "6og7huqnvfqi217ih1mvmif9sk",
	  userPoolArn: "arn:aws:cognito-idp:us-east-1:896299825733:userpool/us-east-1_AqjJCqJRQ",
	  tableName: "aws-sls-todo-dev",
	  tableArn: "arn:aws:dynamodb:us-east-1:896299825733:table/aws-sls-todo-dev",
	  tableReadUnits: 5,
	  tableWriteUnits: 5,
	  indexReadUnits: 5,
	  indexWriteUnits: 5,
	  bucketName: "aws-sls-todo-dev",
	  bucketArn: "arn:aws:s3:::aws-sls-todo-dev"
	}
}

module.exports = () => {
  return configs[stage];
};
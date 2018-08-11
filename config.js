const stage = "dev";

const configs = {
	dev: {
		stage: "dev",
		region: "us-east-1",
	  poolId: "us-east-2_b4ghQFC9D",
	  appClientId: "7g9tqt5tkbbj5g2dhcofdu3u5s",
	  userPoolArn: "arn:aws:cognito-idp:us-east-2:896299825733:userpool/us-east-2_b4ghQFC9D",
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
	  poolId: "us-east-2_b4ghQFC9D",
	  appClientId: "7g9tqt5tkbbj5g2dhcofdu3u5s",
	  userPoolArn: "arn:aws:cognito-idp:us-east-2:896299825733:userpool/us-east-2_b4ghQFC9D",
	  tableName: "aws-sls-todo-test",
	  tableArn: "arn:aws:dynamodb:us-east-1:896299825733:table/aws-sls-todo-dev",
	  tableReadUnits: 5,
	  tableWriteUnits: 5,
	  indexReadUnits: 5,
	  indexWriteUnits: 5,
	  bucketName: "aws-sls-todo-test",
	  bucketArn: "arn:aws:s3:::aws-sls-todo-test"
	}
}

module.exports = () => {
  return configs[stage];
};
const stage = "dev";

const options = {
	dev: {
		stage: "dev",
		region: "us-east-1",
	  bucketName: "aws-sls-todo-dev",
	  bucketArn: "arn:aws:s3:::aws-sls-todo-dev",
	  tableName: "aws-sls-todo-dev",
	  tableArn: "arn:aws:dynamodb:us-east-1:896299825733:table/aws-sls-todo-dev",
	  poolId: "us-east-2_b4ghQFC9D",
	  appClientId: "7g9tqt5tkbbj5g2dhcofdu3u5s",
	  userPoolArn: "arn:aws:cognito-idp:us-east-2:896299825733:userpool/us-east-2_b4ghQFC9D",
	  tableReadUnits: 5,
	  tableWriteUnits: 5,
	  indexReadUnits: 5,
	  indexWriteUnits: 5
	},
	test: {
		stage: "test",
		region: "us-east-1",
	  bucketName: "aws-sls-todo-dev",
	  bucketArn: "arn:aws:s3:::aws-sls-todo-dev",
	  tableName: "aws-sls-todo-dev",
	  tableArn: "arn:aws:dynamodb:us-east-1:896299825733:table/aws-sls-todo-dev",
	  poolId: "us-east-2_b4ghQFC9D",
	  appClientId: "7g9tqt5tkbbj5g2dhcofdu3u5s",
	  userPoolArn: "arn:aws:cognito-idp:us-east-2:896299825733:userpool/us-east-2_b4ghQFC9D",
	  tableReadUnits: 5,
	  tableWriteUnits: 5,
	  indexReadUnits: 5,
	  indexWriteUnits: 5
	}
}

module.exports = () => {
  return options[stage];
};

// used for testing url
console.log("stage="+stage);
console.log("region="+options[stage].region);
console.log("poolId="+options[stage].poolId);
console.log("appClientId="+options[stage].appClientId);

console.log("resource=debug");
console.log("resource=tasks");

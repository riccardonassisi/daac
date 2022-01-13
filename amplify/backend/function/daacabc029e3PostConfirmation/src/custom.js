const aws = require("aws-sdk")
const ddb = new aws.DynamoDB()

const tableName = process.env.USERTABLE

exports.handler = async(event) => {
  // insert code to be executed by your lambda trigger

  console.log(event?.request?.userAttributes)

  if (!event?.request?.userAttributes?.sub) {
    console.log("No sub provided")
    return
  }

  const now = new Date()
  const timestamp = now.getTime()

  const userItem = {
    __typename: { S: "User" },
    _lastChangedAt: { N: timestamp.toString() },
    _version: { N: "1" },
    createdAt: { S: now.toISOString() },
    updatedAt: { S: now.toISOString() },
    id: { S: event?.request?.userAttributes?.sub },
    name: { S: event?.request?.userAttributes?.email },
    imageUri: { S: "https://freesvg.org/img/abstract-user-flat-4.png" },
    status: { S: "Ciao! Sto utilizzando DAAC." }

  }

  const params = {
    Item: userItem,
    TableName: tableName
  }


  try {
    const res = await ddb.putItem(params).promise()
    console.log("LAMBDA FUNCTION")
    console.log(res)
    console.log()
  } catch (e) {
    console.log(e)
  }

}

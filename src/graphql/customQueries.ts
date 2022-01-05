export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      chatRoomUser {
        items {
          chatRoom {
            lastMessage {
              user {
                id
                name
              }
              createdAt
              content
            }
            users {
              items {
                user {
                  imageUri
                  id
                  name
                  status
                }
              }
            }
            id
          }
        }
      }
    }
  }
`
export const listMessageFromChatRoom = /* GraphQL */ `
query MyQueryOne($id: ID!) {
  listMessages(filter: {chatRoomMessagesId: {eq: $id}}) {
    items {
      content
      urls
      createdAt
      id
      chatRoomMessagesId
      user {
        id
        name
      }
    }
  }
}
`

export const listUsersFromChatRoom = /* GraphQL */ `
query MyQueryTwo($id: ID!) {
  listChatRoomUsers(filter: {userID: {eq: $id}}) {
    items {
      chatRoom {
        id
        users {
          items {
            userID
          }
        }
      }
    }
  }
}
`

export const getUserInfo = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      imageUri
      name
      status
    }
  }
`

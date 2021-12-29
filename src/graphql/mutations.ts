/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      users {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        nextToken
      }
      lastMessage {
        id
        content
        urls
        createdAt
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
          chatRoomLastMessageId
        }
        updatedAt
        chatRoomMessagesId
        messageUserId
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      users {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        nextToken
      }
      lastMessage {
        id
        content
        urls
        createdAt
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
          chatRoomLastMessageId
        }
        updatedAt
        chatRoomMessagesId
        messageUserId
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      users {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        nextToken
      }
      lastMessage {
        id
        content
        urls
        createdAt
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
          chatRoomLastMessageId
        }
        updatedAt
        chatRoomMessagesId
        messageUserId
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      urls
      createdAt
      user {
        id
        name
        imageUri
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        users {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessage {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      updatedAt
      chatRoomMessagesId
      messageUserId
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      urls
      createdAt
      user {
        id
        name
        imageUri
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        users {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessage {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      updatedAt
      chatRoomMessagesId
      messageUserId
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      urls
      createdAt
      user {
        id
        name
        imageUri
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        users {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessage {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      updatedAt
      chatRoomMessagesId
      messageUserId
    }
  }
`;
export const createDefaultMessage = /* GraphQL */ `
  mutation CreateDefaultMessage(
    $input: CreateDefaultMessageInput!
    $condition: ModelDefaultMessageConditionInput
  ) {
    createDefaultMessage(input: $input, condition: $condition) {
      id
      content
      urls
      createdAt
      updatedAt
    }
  }
`;
export const updateDefaultMessage = /* GraphQL */ `
  mutation UpdateDefaultMessage(
    $input: UpdateDefaultMessageInput!
    $condition: ModelDefaultMessageConditionInput
  ) {
    updateDefaultMessage(input: $input, condition: $condition) {
      id
      content
      urls
      createdAt
      updatedAt
    }
  }
`;
export const deleteDefaultMessage = /* GraphQL */ `
  mutation DeleteDefaultMessage(
    $input: DeleteDefaultMessageInput!
    $condition: ModelDefaultMessageConditionInput
  ) {
    deleteDefaultMessage(input: $input, condition: $condition) {
      id
      content
      urls
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoomUsers = /* GraphQL */ `
  mutation CreateChatRoomUsers(
    $input: CreateChatRoomUsersInput!
    $condition: ModelChatRoomUsersConditionInput
  ) {
    createChatRoomUsers(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        users {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessage {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatRoomUsers = /* GraphQL */ `
  mutation UpdateChatRoomUsers(
    $input: UpdateChatRoomUsersInput!
    $condition: ModelChatRoomUsersConditionInput
  ) {
    updateChatRoomUsers(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        users {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessage {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatRoomUsers = /* GraphQL */ `
  mutation DeleteChatRoomUsers(
    $input: DeleteChatRoomUsersInput!
    $condition: ModelChatRoomUsersConditionInput
  ) {
    deleteChatRoomUsers(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        users {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessage {
          id
          content
          urls
          createdAt
          updatedAt
          chatRoomMessagesId
          messageUserId
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
    }
  }
`;

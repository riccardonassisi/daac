/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDefaultMessage = /* GraphQL */ `
  query GetDefaultMessage($id: ID!) {
    getDefaultMessage(id: $id) {
      id
      content
      urls
      createdAt
      updatedAt
    }
  }
`;
export const listDefaultMessages = /* GraphQL */ `
  query ListDefaultMessages(
    $filter: ModelDefaultMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDefaultMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        urls
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoomUsers = /* GraphQL */ `
  query GetChatRoomUsers($id: ID!) {
    getChatRoomUsers(id: $id) {
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
export const listChatRoomUsers = /* GraphQL */ `
  query ListChatRoomUsers(
    $filter: ModelChatRoomUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        chatRoomID
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

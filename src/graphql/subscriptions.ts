/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateDefaultMessage = /* GraphQL */ `
  subscription OnCreateDefaultMessage {
    onCreateDefaultMessage {
      id
      content
      urls
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDefaultMessage = /* GraphQL */ `
  subscription OnUpdateDefaultMessage {
    onUpdateDefaultMessage {
      id
      content
      urls
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDefaultMessage = /* GraphQL */ `
  subscription OnDeleteDefaultMessage {
    onDeleteDefaultMessage {
      id
      content
      urls
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoomUsers = /* GraphQL */ `
  subscription OnCreateChatRoomUsers {
    onCreateChatRoomUsers {
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
export const onUpdateChatRoomUsers = /* GraphQL */ `
  subscription OnUpdateChatRoomUsers {
    onUpdateChatRoomUsers {
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
export const onDeleteChatRoomUsers = /* GraphQL */ `
  subscription OnDeleteChatRoomUsers {
    onDeleteChatRoomUsers {
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

export type User = {
  id: string;
  username: string;
  password: string;
};

const mockUsers: User[] = [
  {
    id: "user-0",
    username: "test",
    password: "test",
  },
];

export const findUserByUsername = (username: string): User | undefined => {
  return mockUsers.find((user) => user.username === username);
};

export const addUser = (user: User): User => {
  mockUsers.push(user);
  return user;
};

let nextUserId = mockUsers.length + 1;
export const generateUserId = (): string => {
  return `user-${nextUserId++}`;
};

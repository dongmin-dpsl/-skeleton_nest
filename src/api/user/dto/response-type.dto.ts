export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserList {
  count: number;
  users: UserInfo[];
}

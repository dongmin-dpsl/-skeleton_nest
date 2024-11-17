export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UsersWithMeta {
  count: number;
  users: UserInfo[];
}

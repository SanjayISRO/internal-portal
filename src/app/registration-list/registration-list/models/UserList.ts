export interface UsersList {
    connect: Array<UsersObject>;
    collaborate: Array<UsersObject>;
  }

export interface UsersObject {
    name: string;
    email: string,
    department: string;
    skillSet: Array<string>;
    genPlatform: string;
    isActive: boolean;
    id: number;
    // expertise: string;
}
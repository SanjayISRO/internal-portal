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
    secretKey?: string;
    title?: string;
    problemStatement?: string;
    status?: string;
    teamMembersList?: Array<TeamMemberDetail>
    lastModifiedDateAndTime: string;
    createdDateAndTime: string;
    priorityLevel?: string;
}

export interface TeamMemberDetail {
  name: string;
  email: string;
  genPlatform: string;
  department: string;
}
export type UserRole = 'member'; // placeholder currently
// entity is the representation of the data in db, it should be like the schema
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'active';
  createdAt: Date;
  deletedAt: Date | null;
}

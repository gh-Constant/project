export type Category = 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1';

export type Subject = 'Communication' | 'SAE' | 'Anglais' | 'Informatique' | 'Management' | 'Marketing';

export type UserRole = 'user' | 'admin';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  dueDate: string;
  completed: boolean;
  createdBy: string;
  category: Category;
  createdAt: string;
}

export interface User {
  username: string;
  pin: string;
  category: Category;
  role?: UserRole;
  ip?: string;
}

export interface BannedUser {
  username: string;
  ip: string;
  reason: string;
  bannedAt: string;
  bannedBy: string;
}
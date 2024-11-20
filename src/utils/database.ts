import { Assignment, User, BannedUser } from '../types';

const USERS_KEY = 'homework_users';
const ASSIGNMENTS_KEY = 'homework_assignments';
const BANNED_USERS_KEY = 'banned_users';
const WHITELISTED_IPS = ['localhost', '127.0.0.1', '::1'];

// Initialize root user if not exists
const initRootUser = () => {
  const users = localStorage.getItem(USERS_KEY);
  const parsedUsers = users ? JSON.parse(users) : [];
  
  if (!parsedUsers.some((u: User) => u.username === 'root')) {
    parsedUsers.push({
      username: 'root',
      pin: '042204',
      category: 'C2',
      role: 'admin'
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(parsedUsers));
  }
};

initRootUser();

export const db = {
  // User operations
  getUsers: (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User): void => {
    const users = db.getUsers();
    if (users.some(u => u.username === user.username)) {
      throw new Error('Username already exists');
    }
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getUser: (username: string, pin: string): User | null => {
    const users = db.getUsers();
    return users.find(u => u.username === username && u.pin === pin) || null;
  },

  // Ban operations
  getBannedUsers: (): BannedUser[] => {
    const banned = localStorage.getItem(BANNED_USERS_KEY);
    return banned ? JSON.parse(banned) : [];
  },

  banUser: (bannedUser: BannedUser): void => {
    const bannedUsers = db.getBannedUsers();
    bannedUsers.push(bannedUser);
    localStorage.setItem(BANNED_USERS_KEY, JSON.stringify(bannedUsers));
  },

  isIpBanned: (ip: string): boolean => {
    if (WHITELISTED_IPS.includes(ip)) return false;
    const bannedUsers = db.getBannedUsers();
    return bannedUsers.some(user => user.ip === ip);
  },

  isUserBanned: (username: string): boolean => {
    const bannedUsers = db.getBannedUsers();
    return bannedUsers.some(user => user.username === username);
  },

  // Assignment operations
  getAssignments: (): Assignment[] => {
    const assignments = localStorage.getItem(ASSIGNMENTS_KEY);
    return assignments ? JSON.parse(assignments) : [];
  },

  saveAssignment: (assignment: Assignment): void => {
    const assignments = db.getAssignments();
    assignments.push(assignment);
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
  },

  updateAssignment: (assignment: Assignment): void => {
    const assignments = db.getAssignments();
    const index = assignments.findIndex(a => a.id === assignment.id);
    if (index !== -1) {
      assignments[index] = assignment;
      localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
    }
  },

  getAssignmentsByCategory: (category: string): Assignment[] => {
    return db.getAssignments().filter(a => a.category === category);
  },

  deleteAssignmentsByUser: (username: string): void => {
    const assignments = db.getAssignments();
    const filteredAssignments = assignments.filter(a => a.createdBy !== username);
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(filteredAssignments));
  }
};
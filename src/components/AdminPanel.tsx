import React, { useState, useEffect } from 'react';
import { User, Assignment } from '../types';
import { db } from '../utils/database';
import { Ban, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    setUsers(db.getUsers().filter(u => u.username !== 'root'));
    setAssignments(db.getAssignments());
  }, []);

  const handleBanUser = (user: User) => {
    if (!user.ip) {
      toast.error("Impossible de bannir l'utilisateur sans IP");
      return;
    }

    db.banUser({
      username: user.username,
      ip: user.ip,
      reason: 'Devoirs inutiles',
      bannedAt: new Date().toISOString(),
      bannedBy: 'root'
    });

    db.deleteAssignmentsByUser(user.username);
    toast.success(`${user.username} a été banni`);
    
    // Refresh lists
    setUsers(db.getUsers().filter(u => u.username !== 'root'));
    setAssignments(db.getAssignments());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Panel Administrateur</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Utilisateurs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Devoirs créés
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.username}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignments.filter(a => a.createdBy === user.username).length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleBanUser(user)}
                      className="text-red-600 hover:text-red-900 mr-3"
                      title="Bannir l'utilisateur"
                    >
                      <Ban className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
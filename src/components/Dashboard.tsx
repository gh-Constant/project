import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, LogOut, Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { db } from '../utils/database';
import { Assignment } from '../types';
import NewAssignment from './NewAssignment';
import Timeline from './Timeline';
import Calendar from './Calendar';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [view, setView] = useState<'timeline' | 'calendar'>('timeline');

  useEffect(() => {
    if (user) {
      const userAssignments = db.getAssignmentsByCategory(user.category);
      setAssignments(userAssignments);
    }
  }, [user]);

  const handleAssignmentCreated = () => {
    if (user) {
      setAssignments(db.getAssignmentsByCategory(user.category));
    }
  };

  const getChartData = () => {
    const subjectCounts: { [key: string]: number } = {};
    assignments.forEach(assignment => {
      subjectCounts[assignment.subject] = (subjectCounts[assignment.subject] || 0) + 1;
    });
    return Object.entries(subjectCounts).map(([subject, count]) => ({
      subject,
      count
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                Tableau de Bord - {user?.username} ({user?.category})
              </span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setView('timeline')}
              className={`px-4 py-2 rounded-md ${
                view === 'timeline'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Timeline
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md ${
                view === 'calendar'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CalendarIcon className="w-4 h-4 inline mr-2" />
              Calendrier
            </button>
          </div>
          <button
            onClick={() => setShowNewAssignment(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Devoir
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {view === 'timeline' ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Timeline des Devoirs</h2>
                <Timeline assignments={assignments} />
              </div>
            ) : (
              <Calendar assignments={assignments} />
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Statistiques</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Résumé
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Devoirs à venir</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {assignments.filter(a => !a.completed).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Devoirs complétés</p>
                  <p className="text-2xl font-bold text-green-600">
                    {assignments.filter(a => a.completed).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewAssignment
        isOpen={showNewAssignment}
        onClose={() => setShowNewAssignment(false)}
        onAssignmentCreated={handleAssignmentCreated}
      />
    </div>
  );
}
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Assignment } from '../types';
import { Calendar, Clock } from 'lucide-react';

interface Props {
  assignments: Assignment[];
}

export default function Timeline({ assignments }: Props) {
  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedAssignments.map((assignment, idx) => (
          <li key={assignment.id}>
            <div className="relative pb-8">
              {idx !== sortedAssignments.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                    ${assignment.completed ? 'bg-green-500' : 'bg-indigo-500'}`}>
                    {assignment.completed ? (
                      <Calendar className="h-5 w-5 text-white" />
                    ) : (
                      <Clock className="h-5 w-5 text-white" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {assignment.title}
                      </span>{' '}
                      - {assignment.subject}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {assignment.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={assignment.dueDate}>
                      {format(new Date(assignment.dueDate), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
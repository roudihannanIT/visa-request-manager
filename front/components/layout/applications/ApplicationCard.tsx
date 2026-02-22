import Link from 'next/link';
import { Application } from '../../../types';

interface Props {
  application: Application;
  onDelete?: (id: string) => void;
}

const ApplicationCard = ({ application, onDelete }: Props) => {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const visaTypeEmoji = {
    'Blue Card': '🔵',
    'Family Reunion': '👨‍👩‍👧‍👦',
    'Student Visa': '🎓',
    'Job Seeker': '💼',
    'Tourist': '✈️',
    'Other': '📄'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{visaTypeEmoji[application.visaType]}</span>
          <div>
            <h3 className="text-md font-semibold text-gray-500">{application.title}</h3>
            <p className="text-sm text-gray-600">{application.visaType}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[application.status]}`}>
          {application.status}
        </span>
      </div>

      {application.appointmentDate && (
        <p className="text-sm text-gray-500 mb-2">
          📅 Interview: {new Date(application.appointmentDate).toLocaleDateString('en-GB')}
        </p>
      )}

      {application.notes && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{application.notes}</p>
      )}

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <Link 
          href={`/applications/${application._id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
        
        {onDelete && (
          <button
            onClick={() => onDelete(application._id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
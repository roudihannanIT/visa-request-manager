import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createApplication } from '../../utils/api';
import { VisaType, ApplicationStatus } from '../../types/index';

type FormData = {
  title: string;
  visaType: VisaType;
  status: ApplicationStatus;
  appointmentDate: string;
  notes: string;
};

const NewApplication: NextPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    defaultValues: {
      status: 'pending',
      visaType: 'Blue Card'
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setServerError('');
    
    try {
      const formattedData = {
        ...data,
        appointmentDate: data.appointmentDate ? new Date(data.appointmentDate).toISOString() : undefined
      };
      
      const response = await createApplication(formattedData);
      
      if (response.success) {

        router.push('/dashboard');
      } else {
        setServerError(response.message || 'Failed to create application');
      }
    } catch (error: any) {
      setServerError(error.message || 'Something went wrong');
      console.error('Error creating application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>New Application | Visa Manager</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-950">Create New Application</h1>
          <p className="text-gray-600">Fill in the details for your visa application</p>
        </div>

        {/* Error Message */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            ⚠️ {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Application Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { 
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' },
                maxLength: { value: 100, message: 'Title must be less than 100 characters' }
              })}
              className={`w-full px-4 py-2 border text-gray-950 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Blue Card Application for SAP"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Visa Type Field */}
          <div>
            <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-1">
              Visa Type <span className="text-red-500">*</span>
            </label>
            <select
              id="visaType"
              {...register('visaType', { required: 'Visa type is required' })}
              className={`w-full px-4 py-2 border text-gray-950 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.visaType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="Blue Card">🔵 Blue Card</option>
              <option value="Family Reunion">👨‍👩‍👧‍👦 Family Reunion</option>
              <option value="Student Visa">🎓 Student Visa</option>
              <option value="Job Seeker">💼 Job Seeker</option>
              <option value="Tourist">✈️ Tourist</option>
              <option value="Other">📄 Other</option>
            </select>
            {errors.visaType && (
              <p className="mt-1 text-sm text-red-600">{errors.visaType.message}</p>
            )}
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="text-gray-950 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">🟡 Pending</option>
              <option value="in-progress">🔵 In Progress</option>
              <option value="completed">🟢 Completed</option>
              <option value="cancelled">🔴 Cancelled</option>
            </select>
          </div>

          {/* Appointment Date Field */}
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">
              Interview Date (Optional)
            </label>
            <input
              type="date"
              id="appointmentDate"
              {...register('appointmentDate')}
              className="w-full px-4 text-gray-950 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
            <p className="mt-1 text-xs text-gray-500">
              Select the date of your embassy interview (must be in the future)
            </p>
          </div>

          {/* Notes Field */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              {...register('notes', { maxLength: 500 })}
              className="w-full px-4 text-gray-950 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any additional information about your application..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Max 500 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? 'Creating...' : '✨ Create Application'}
            </button>
            
            <Link
              href="/dashboard"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold text-center transition"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Tips for your application:</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Use a descriptive title that includes the company/university name</li>
            <li>Add your interview date as soon as you have it</li>
            <li>Use notes to track important details like contact information</li>
            <li>You can add required documents after creating the application</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NewApplication;
import mongoose from "mongoose";

export interface IApplication extends mongoose.Document {
    title: string;
    visaType: 'Blue Card' | 'Family Reunion' | 'Student Visa' | 'Job Seeker' | 'Tourist' | 'Other';
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    appointmentDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const applicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Order title required'],
        trim: true,
        minlength: [3, 'The title must be at least 3 letters long'],
        maxlength: [100, 'The title must be less than 100 characters'],
    },
    visType: {
        type: String,
        required: [true, 'Visa type required'],
        enum: {
            values: ['Blue Card', 'Family Reunion', 'Student Visa', 'Job Seeker', 'Tourist', 'Other'],
            message: 'Visa type invalid'
        }
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    appointmentDate: {
        type: Date,
        validate: {
            validator: function(value: Date) {
                return !value || value > new Date();
            },
            message: 'The interview date should be in the future'
        }
    },
    notes: {
        type: String,
        maxlength: [500, 'The comments should be less than 500 characters']
    }
},{timestamps: true});

const Application = mongoose.model<IApplication>('Application', applicationSchema);

export default Application;
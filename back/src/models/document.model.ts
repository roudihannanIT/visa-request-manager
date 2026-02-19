import { application } from "express";
import mongoose, { mongo } from "mongoose";
import { create } from "node:domain";

export interface IDocument extends mongoose.Document {
    applicationId: mongoose.Types.ObjectId;
    name: string;
    isReady: boolean;
    notes?: string;
    deadline?: Date;
    fileUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const documentSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Application',
        required: [true, 'ID required']
    },
     name: {
        type: String,
        required: [true, 'Document name is required!'],
        trim: true,
        minlength: [2, 'The document name must be at least 2 characters long'],
        maxlength: [200, 'The document name must be less than 200 characters']
    },
    isReady: {
        type: Boolean,
        default: false
    },
    notes: {
        type: Boolean,
        maxlength: [300, 'the notes must be less than 300 characters']
    },
    deadline: {
        type: Date,
        validate: {
            validator: function(value: Date) {
                return !value || value > new Date();
            },
            message: 'The deadline should be in the future'
        }
    },
    fileUrl: {
        type: String,
        validate: {
            validator: function(value: String) {
                return !value || value.startsWith('http');
            },
            message: 'The file link is invalid!'
        }
    }
}, {timestamps: true});

documentSchema.index({application: 1, createdAt: -1});

const Document = mongoose.model<IDocument>('Document', documentSchema);

export default Document;
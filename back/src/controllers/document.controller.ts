import { Request, Response } from 'express';
import Document from '../models/document.model';
import Application from '../models/application.model';

// Add a document to a specific order
// POST /api/applications/:applicationId/documents
export const addDocument = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;

    // Ensure that the order exists
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'the order does not exist'
      });
    }

    const document = await Document.create({
      ...req.body,
      applicationId
    });

    res.status(201).json({
      success: true,
      data: document,
      message: 'Document added successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'An error occurred while add the document'
    });
  }
};

// Get a document to a specific order
// GET /api/applications/:applicationId/documents
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Document.find({ 
      applicationId: req.params.applicationId 
    }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while get the documents'
    });
  }
};

// Update document
// PUT /api/documents/:id
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'the document does not exist'
      });
    }

    res.status(200).json({
      success: true,
      data: document,
      message: 'the document updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'An error occurred while update the document'
    });
  }
};

// Delete the document
// DELETE /api/documents/:id
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'the document does not exist'
      });
    }

    res.status(200).json({
      success: true,
      message: 'the document has been deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while delete the document'
    });
  }
};

// update document status (ready | not ready)
// PUT /api/documents/:id/toggle
export const toggleDocumentStatus = async (req: Request, res: Response) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'the document does not exist'
      });
    }

    document.isReady = !document.isReady;
    await document.save();

    res.status(200).json({
      success: true,
      data: document,
      message: `The document status has been changed to ${document.isReady ? 'ready' : 'not ready'}`
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while update the status'
    });
  }
};
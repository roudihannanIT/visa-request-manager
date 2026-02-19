import { Request, Response } from 'express';
import Application from '../models/application.model';
import Document from '../models/document.model';

// create new order       
// POST /api/applications  
export const createApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.create(req.body);
    
    res.status(201).json({
      success: true,
      data: application,
      message: 'The request was created successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'An error occurred while creating the request!'
    });
  }
};

// get all orders        
// GET /api/applications
export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find().sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while get the orders!'
    });
  }
};

// get one order
// GET /api/applications/:id
export const getApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'order does not exist'
      });
    }

    // Bring the documents related to this order
    const documents = await Document.find({ applicationId: application._id });

    res.status(200).json({
      success: true,
      data: {
        ...application.toObject(),
        documents
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while get the order'
    });
  }
};

// update order
// PUT /api/applications/:id
export const updateApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return updated data
        runValidators: true // Runs validation
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'the order dose not exist!'
      });
    }

    res.status(200).json({
      success: true,
      data: application,
      message: 'The order has been updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'An error occurred while update the order'
    });
  }
};

// delete order
// DELETE /api/applications/:id
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'the order dose not exist!'
      });
    }

    // Delete all the documents related with this order
    await Document.deleteMany({ applicationId: application._id });

    res.status(200).json({
      success: true,
      message: 'The request and associated documents have been successfully deleted'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while delete the order'
    });
  }
};
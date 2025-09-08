const express = require('express');
const resumeRouter = express.Router();
const {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
    downloadResumePDF,
    generatePreviewPDF, 
} = require('../controllers/resumecontroller');
const { protect } = require('../middlewares/authmiddleware');

resumeRouter.route('/')
    .post(protect, createResume)
    .get(protect, getUserResumes);

resumeRouter.route('/preview')
    .post(protect, generatePreviewPDF);

resumeRouter.route('/:id/download')
    .get(protect, downloadResumePDF);

resumeRouter
    .route('/:id')
    .get(protect, getResumeById)
    .put(protect, updateResume)
    .delete(protect, deleteResume);

module.exports = resumeRouter;























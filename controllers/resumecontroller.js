// const Resume = require('../models/resumeModel.js');
// const { generatePdf } = require('../utils/pdfTemplate.js');

// // @desc    Get all resumes for the logged-in user
// // @route   GET /api/resume
// const getMyResumes = async (req, res) => {
//     const resumes = await Resume.find({ user: req.user._id });
//     res.status(200).json(resumes);
// };

// // @desc    Get a single resume by its ID
// // @route   GET /api/resume/:id
// const getResumeById = async (req, res) => {
//     const resume = await Resume.findById(req.params.id);
//     if (resume && resume.user.toString() === req.user._id.toString()) {
//         res.status(200).json(resume);
//     } else {
//         res.status(404).json({ message: 'Resume not found' });
//     }
// };

// // @desc    Create a new resume
// // @route   POST /api/resume
// const createResume = async (req, res) => {
//     const { templateName, resumeData } = req.body;
//     const resume = new Resume({
//         user: req.user._id,
//         templateName,
//         resumeData,
//     });
//     const createdResume = await resume.save();
//     res.status(201).json(createdResume);
// };

// // @desc    Update an existing resume
// // @route   PUT /api/resume/:id
// const updateResume = async (req, res) => {
//     const { resumeData, templateName } = req.body;
//     const resume = await Resume.findById(req.params.id);

//     if (resume && resume.user.toString() === req.user._id.toString()) {
//         resume.resumeData = resumeData || resume.resumeData;
//         resume.templateName = templateName || resume.templateName;
//         const updatedResume = await resume.save();
//         res.status(200).json(updatedResume);
//     } else {
//         res.status(404).json({ message: 'Resume not found' });
//     }
// };

// // @desc    Delete a resume
// // @route   DELETE /api/resume/:id
// const deleteResume = async (req, res) => {
//     const resume = await Resume.findById(req.params.id);
//     if (resume && resume.user.toString() === req.user._id.toString()) {
//         await resume.deleteOne();
//         res.status(200).json({ message: 'Resume removed' });
//     } else {
//         res.status(404).json({ message: 'Resume not found' });
//     }
// };

// // @desc    Generate a PDF preview
// // @route   POST /api/resume/preview
// const generatePdfPreview = async (req, res) => {
//     try {
//         const { resumeData, templateName } = req.body;
//         const pdfBuffer = await generatePdf(resumeData, templateName);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error('PDF Generation Error:', error);
//         res.status(500).send('Error generating PDF');
//     }
// };


// module.exports = {
//     getMyResumes,
//     getResumeById,
//     createResume,
//     updateResume,
//     deleteResume,
//     generatePdfPreview,
// };




const Resume = require('../models/resumeModel.js');
const { generatePdf } = require('../utils/pdfTemplate.js');

// @desc    Get all resumes for the logged-in user
const getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id });
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching resumes.' });
    }
};

// @desc    Get a single resume by its ID
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume && resume.user.toString() === req.user._id.toString()) {
            res.status(200).json(resume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching resume.' });
    }
};

// @desc    Create a new resume
const createResume = async (req, res) => {
    try {
        const { templateName, resumeData } = req.body;
        const resume = new Resume({
            user: req.user._id,
            templateName,
            resumeData,
        });
        const createdResume = await resume.save();
        res.status(201).json(createdResume);
    } catch (error) {
        res.status(400).json({ message: 'Error creating resume.' });
    }
};

// @desc    Update an existing resume
const updateResume = async (req, res) => {
    try {
        const { resumeData, templateName } = req.body;
        const resume = await Resume.findById(req.params.id);

        if (resume && resume.user.toString() === req.user._id.toString()) {
            resume.resumeData = resumeData || resume.resumeData;
            resume.templateName = templateName || resume.templateName;
            const updatedResume = await resume.save();
            res.status(200).json(updatedResume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating resume.' });
    }
};

// @desc    Delete a resume
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume && resume.user.toString() === req.user._id.toString()) {
            await resume.deleteOne();
            res.status(200).json({ message: 'Resume removed' });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting resume.' });
    }
};

// @desc    Generate a PDF preview
// --- FIX: This function now correctly handles the request payload and provides better error logging ---
// const generatePdfPreview = async (req, res) => {
//     try {
//         const { resumeData, templateName } = req.body;
//         if (!resumeData) {
//             return res.status(400).json({ message: 'No resume data provided for preview.' });
//         }
        
//         const pdfBuffer = await generatePdf(resumeData, templateName);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error('PUPPETEER PDF GENERATION ERROR:', error);
//         res.status(500).json({ message: 'Error generating PDF preview on the server.' });
//     }
// };

// backend/controllers/resumecontroller.js

const generatePdfPreview = async (req, res) => {
    try {
        const { resumeData, templateName } = req.body;
        if (!resumeData) {
            return res.status(400).json({ message: 'No resume data provided for preview.' });
        }
        const stream = await generatePdf(resumeData, templateName);
        res.setHeader('Content-Type', 'application/pdf');
        stream.pipe(res);
    } catch (error) {
        console.error('PDF Preview Error:', error);
        res.status(500).json({ message: 'Error generating PDF preview.' });
    }
};
module.exports = {
    getMyResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume,
    generatePdfPreview,
};

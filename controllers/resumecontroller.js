const Resume = require('../models/resumeModel');
const puppeteer = require('puppeteer');
const { getResumeHTML } = require('../utils/pdfTemplate');

const createResume = async (req, res) => {
    const { templateName, resumeData } = req.body;
    try {
        const resume = new Resume({ user: req.user._id, templateName, resumeData });
        const createdResume = await resume.save();
        res.status(201).json(createdResume);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume && resume.user.toString() === req.user._id.toString()) {
            res.json(resume);
        } else {
            res.status(404).json({ message: 'Resume not found or user not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateResume = async (req, res) => {
    const { templateName, resumeData } = req.body;
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume && resume.user.toString() === req.user._id.toString()) {
            resume.templateName = templateName || resume.templateName;
            resume.resumeData = resumeData || resume.resumeData;
            const updatedResume = await resume.save();
            res.json(updatedResume);
        } else {
            res.status(404).json({ message: 'Resume not found or user not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume && resume.user.toString() === req.user._id.toString()) {
            await resume.deleteOne();
            res.json({ message: 'Resume removed' });
        } else {
            res.status(404).json({ message: 'Resume not found or user not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


const downloadResumePDF = async (req, res) => {
    let browser;
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume || resume.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Resume not found or user not authorized' });
        }
        browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        const htmlContent = getResumeHTML(resume.resumeData, resume.templateName);
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
        });
        res.setHeader('Content-Type', 'application/pdf');
        const filename = resume.resumeData.personalDetails?.name?.replace(/\s+/g, '_') || 'resume';
        res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error("PDF Generation Error:", error);
        res.status(500).json({ message: 'Server Error while generating PDF', error: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

/**
 * @desc    Generate a PDF preview from provided data without saving
 * @route   POST /api/resumes/preview
 * @access  Private
 */
const generatePreviewPDF = async (req, res) => {
    let browser;
    try {
        const { resumeData, templateName } = req.body;

        if (!resumeData || !templateName) {
            return res.status(400).json({ message: 'Resume data and template name are required for a preview.' });
        }

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        const htmlContent = getResumeHTML(resumeData, templateName);
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error("PDF Preview Generation Error:", error);
        res.status(500).json({ message: 'Server Error while generating PDF preview', error: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
    downloadResumePDF,
    generatePreviewPDF, 
};
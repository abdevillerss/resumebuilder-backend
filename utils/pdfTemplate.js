
const getResumeHTML = (resumeData, templateName = 'modern') => {
    // Helper function to sanitize text to prevent HTML injection
    const sanitize = (text) => {
        if (!text) return '';
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };


    const personalDetails = resumeData.personalDetails || {};
    const experience = resumeData.experience || [];
    const education = resumeData.education || [];
    const projects = resumeData.projects || [];
    const skills = resumeData.skills || [];
    const summary = resumeData.summary || '';

    let styles = '';
    let body = '';


    switch (templateName) {
        case 'professional': 
        case 'modern':
        default:
            styles = `
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10pt; color: #333; margin: 40px; background-color: #fff; }
                .header { text-align: center; padding-bottom: 10px; border-bottom: 1px solid #000; }
                .name-title { font-size: 24pt; font-weight: bold; color: #000; margin: 0; text-transform: uppercase; }
                .contact-info { text-align: center; font-size: 9pt; color: #333; margin-top: 5px; margin-bottom: 15px; }
                .contact-info a { color: #333; text-decoration: none; }
                .section { margin-bottom: 15px; }
                .section-title { font-size: 11pt; font-weight: bold; text-transform: uppercase; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 8px; }
                .item { margin-bottom: 10px; }
                .item-header { display: flex; justify-content: space-between; align-items: baseline; }
                .item-title { font-weight: bold; font-size: 10.5pt; }
                .item-subheader { font-style: normal; color: #333; }
                .about-box { font-size: 10pt; margin: 4px 0; }
                .item-content ul { padding-left: 18px; margin-top: 5px; list-style-type: disc; }
                .skills-list { padding: 0; margin: 0; }
                .skills-list li { margin-bottom: 5px; }
            `;
            body = `
                <div class="header">
                    <h1 class="name-title">${sanitize(personalDetails.name)}</h1>
                </div>
                <div class="contact-info">
                    <span>${sanitize(personalDetails.phone)}</span> &bull;
                    <a href="mailto:${sanitize(personalDetails.email)}">${sanitize(personalDetails.email)}</a> &bull;
                    <a href="${sanitize(personalDetails.linkedin)}" target="_blank">${sanitize(personalDetails.linkedin)}</a>
                </div>
                <div class="section">
                    <h2 class="section-title">Summary</h2>
                    <p>${sanitize(summary)}</p>
                </div>
                <div class="section">
                    <h2 class="section-title">Education</h2>
                    ${education.map(edu => `
                        <div class="item">
                            <div class="item-header">
                                <span class="item-title">${sanitize(edu.school)}</span>
                                <span style="font-size: 9.5pt;">${sanitize(edu.gradDate)}</span>
                            </div>
                            <div class="item-subheader">${sanitize(edu.degree)}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="section">
                    <h2 class="section-title">Technical Skills</h2>
                    <div class="item-content">
                        <ul>${(skills || []).map(line => `<li>${sanitize(line)}</li>`).join('')}</ul>
                    </div>
                </div>
                <div class="section">
                    <h2 class="section-title">Projects</h2>
                    ${projects.map(proj => `
                        <div class="item">
                            <div class="item-header"><span class="item-title">${sanitize(proj.title)}</span></div>
                            <p class="about-box">${sanitize(proj.about)}</p>
                            <div class="item-content"><ul>${(proj.description || []).map(line => `<li>${sanitize(line)}</li>`).join('')}</ul></div>
                        </div>
                    `).join('')}
                </div>
                <div class="section">
                    <h2 class="section-title">Experience</h2>
                    ${experience.map(exp => `
                        <div class="item">
                            <div class="item-header">
                                <span class="item-title">${sanitize(exp.jobTitle)}</span>
                                <span style="font-size: 9.5pt;">${sanitize(exp.startDate)} - ${sanitize(exp.endDate)}</span>
                            </div>
                            <div class="item-subheader">${sanitize(exp.company)}</div>
                            <p class="about-box">${sanitize(exp.about)}</p>
                            <div class="item-content"><ul>${(exp.description || []).map(line => `<li>${sanitize(line)}</li>`).join('')}</ul></div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
        case 'classic':
             styles = `
                body { font-family: 'Georgia', Times, 'Times New Roman', serif; color: #222; font-size: 11pt; line-height: 1.4; }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
                .header .name-title { font-size: 28pt; font-weight: bold; }
                .header .contact-info { font-size: 10pt; color: #555; }
                .section { margin-bottom: 15px; }
                .section-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #ccc; padding-bottom: 3px; }
                .item { margin-bottom: 12px; }
                .item-header { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 2px; }
                .item-subheader { font-style: italic; color: #555; margin-bottom: 4px; }
                .item-content ul { padding-left: 20px; margin: 0; }
                .skills-list { columns: 2; }
            `;
            body = `
                <div class="header">
                    <div class="name-title">${sanitize(personalDetails.name)}</div>
                    <div class="contact-info">
                        ${sanitize(personalDetails.phone)} | ${sanitize(personalDetails.email)} | ${sanitize(personalDetails.linkedin)} | ${sanitize(personalDetails.github)}
                    </div>
                </div>
                <div class="section"><h2 class="section-title">Professional Experience</h2>
                    ${experience.map(exp => `
                        <div class="item">
                            <div class="item-header"><span><strong>${sanitize(exp.jobTitle)}</strong>, ${sanitize(exp.company)}</span><span>${sanitize(exp.startDate)} - ${sanitize(exp.endDate)}</span></div>
                            <div class="item-subheader">${sanitize(exp.location)}</div>
                            <div class="item-content"><ul>${(exp.description || []).map(line => `<li>${sanitize(line)}</li>`).join('')}</ul></div>
                        </div>
                    `).join('')}
                </div>
                <div class="section"><h2 class="section-title">Projects</h2>
                     ${projects.map(proj => `
                        <div class="item">
                            <div class="item-header"><span><strong>${sanitize(proj.title)}</strong></span><span>${sanitize(proj.duration)}</span></div>
                            <div class="item-content"><ul>${(proj.description || []).map(line => `<li>${sanitize(line)}</li>`).join('')}</ul></div>
                        </div>
                    `).join('')}
                </div>
                <div class="section"><h2 class="section-title">Technical Skills</h2>
                    <div class="skills-list">${skills.map(skill => `<div>- ${sanitize(skill)}</div>`).join('')}</div>
                </div>
                <div class="section"><h2 class="section-title">Education</h2>
                    ${education.map(edu => `<div class="item"><div class="item-header"><span><strong>${sanitize(edu.school)}</strong> - ${sanitize(edu.degree)}</span><span>${sanitize(edu.gradDate)}</span></div></div>`).join('')}
                </div>
            `;
            break;
    }

    
    return `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Resume</title><link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Georgia&display=swap" rel="stylesheet"><style>${styles}</style></head><body>${body}</body></html>`;
};

module.exports = { getResumeHTML };
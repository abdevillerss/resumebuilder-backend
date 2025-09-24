


// const React = require('react');
// const { renderToStream } = require('@react-pdf/renderer');
// const { Page, Text, View, Document, StyleSheet } = require('@react-pdf/renderer');

// const styles = StyleSheet.create({
//     page: { fontFamily: 'Helvetica', fontSize: 10, padding: '1.5cm', color: '#333' },
//     header: { textAlign: 'center', borderBottomWidth: 2, borderBottomColor: '#333', paddingBottom: 12, marginBottom: 12 },
//     name: { fontSize: 26, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
//     title: { fontSize: 12, color: '#444', marginTop: 4 },
//     contactInfo: { textAlign: 'center', fontSize: 9, color: '#555', marginBottom: 15 },
//     section: { marginBottom: 15 },
//     sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#555', paddingBottom: 4, marginBottom: 8 },
//     item: { marginBottom: 12 },
//     itemHeader: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 10.5, fontWeight: 'bold' },
//     itemSubheader: { fontStyle: 'italic', color: '#444', marginVertical: 2 },
//     bulletPoint: { flexDirection: 'row', marginBottom: 4, paddingLeft: 5 },
//     bullet: { width: 10, fontSize: 10 },
//     bulletText: { flex: 1 },
//     summaryText: { lineHeight: 1.5, textAlign: 'justify' },
// });

// const PdfDocument = ({ resumeData }) => {
//     const { personalDetails = {}, sections = [], summary = '', experience = [], projects = [], education = [], skills = [] } = resumeData;
    
//     const renderBulletPoints = (points) => {
//         return (points || []).map((point, j) => (
//             <View key={j} style={styles.bulletPoint}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.bulletText}>{point}</Text>
//             </View>
//         ));
//     };

//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.header}>
//                     <Text style={styles.name}>{personalDetails.name || ''}</Text>
//                     <Text style={styles.title}>{personalDetails.professionalTitle || ''}</Text>
//                 </View>
//                 <Text style={styles.contactInfo}>{personalDetails.phone || ''} • {personalDetails.email || ''}</Text>

//                 {sections.map((section, i) => {
//                     if (section.key === 'summary' && resumeData.summary) {
//                         return (
//                             <View key={i} style={styles.section}>
//                                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                                 <Text style={styles.summaryText}>{resumeData.summary}</Text>
//                             </View>
//                         );
//                     }
//                     if (section.key === 'experience' && resumeData.experience) {
//                         return (
//                             <View key={i} style={styles.section}>
//                                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                                 {resumeData.experience.map((exp, j) => (
//                                     <View key={j} style={styles.item}>
//                                         <View style={styles.itemHeader}>
//                                             <Text>{exp.jobTitle || ''}</Text>
//                                             <Text>{exp.duration || ''}</Text>
//                                         </View>
//                                         <Text style={styles.itemSubheader}>{exp.company || ''}</Text>
//                                         {renderBulletPoints([exp.description])}
//                                     </View>
//                                 ))}
//                             </View>
//                         );
//                     }
//                     if (section.key === 'projects' && resumeData.projects) {
//                         return (
//                             <View key={i} style={styles.section}>
//                                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                                 {resumeData.projects.map((proj, j) => (
//                                     <View key={j} style={styles.item}>
//                                         <View style={styles.itemHeader}><Text>{proj.projectTitle || ''}</Text></View>
//                                         <Text style={styles.itemSubheader}>{proj.description || ''}</Text>
//                                         {renderBulletPoints(proj.bulletPoints)}
//                                     </View>
//                                 ))}
//                             </View>
//                         );
//                     }
//                     if (section.key === 'education' && resumeData.education) {
//                         return (
//                             <View key={i} style={styles.section}>
//                                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                                 {resumeData.education.map((edu, j) => (
//                                     <View key={j} style={styles.item}>
//                                         <View style={styles.itemHeader}>
//                                             <Text>{edu.universityName || ''}</Text>
//                                             <Text>{edu.duration || ''}</Text>
//                                         </View>
//                                         <Text style={styles.itemSubheader}>{edu.degree || ''}</Text>
//                                     </View>
//                                 ))}
//                             </View>
//                         );
//                     }
//                     if (section.key === 'skills' && resumeData.skills) {
//                         return (
//                             <View key={i} style={styles.section}>
//                                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                                 <Text>{(resumeData.skills || []).join(', ')}</Text>
//                             </View>
//                         );
//                     }
//                     if (section.isCustom) {
//                         return (
//                             <View key={i} style={styles.section}>
//                                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                                 {section.type === 'list-with-bullets' ? (
//                                     (resumeData[section.key] || []).map((item, j) => (
//                                         <View key={j} style={styles.item}>
//                                             <View style={styles.itemHeader}><Text>{item.title || ''}</Text></View>
//                                             <Text style={styles.itemSubheader}>{item.subtitle || ''}</Text>
//                                             {renderBulletPoints(item.bulletPoints)}
//                                         </View>
//                                     ))
//                                 ) : section.type === 'single-input-and-description' ? (
//                                     (resumeData[section.key] || []).map((item, j) => (
//                                         <View key={j} style={styles.item}>
//                                             <View style={styles.itemHeader}><Text>{item.title || ''}</Text></View>
//                                             <Text style={styles.summaryText}>{item.description || ''}</Text>
//                                         </View>
//                                     ))
//                                 ) : (
//                                     <Text style={styles.summaryText}>{resumeData[section.key] || ''}</Text>
//                                 )}
//                             </View>
//                         );
//                     }
//                     return null;
//                 })}
//             </Page>
//         </Document>
//     );
// };

// const generatePdf = async (resumeData) => {
//     try {
//         const stream = await renderToStream(<PdfDocument resumeData={resumeData} />);
//         return stream;
//     } catch (error) {
//         console.error("React-PDF Generation Error:", error);
//         throw new Error('Could not generate PDF.');
//     }
// };

// module.exports = { generatePdf };







// backend/utils/pdfTemplate.js

const React = require('react');
const { renderToStream } = require('@react-pdf/renderer');
const { Page, Text, View, Document, StyleSheet } = require('@react-pdf/renderer');

// --- STYLES FOR TEMPLATE 1: Academic ---
const academicStyles = StyleSheet.create({
    page: { fontFamily: 'Times-Roman', fontSize: 11, padding: '1cm 1.4cm', color: '#333' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 10 },
    headerLeft: { maxWidth: '65%' },
    headerRight: { textAlign: 'right', fontSize: 9, maxWidth: '35%' },
    name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
    headerInfo: { fontSize: 10, marginBottom: 2 },
    link: { color: 'blue', textDecoration: 'underline' },
    section: { marginBottom: 12 },
    sectionTitleContainer: { backgroundColor: '#f3f3f3', paddingVertical: 4, paddingHorizontal: 6, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
    item: { marginBottom: 8 },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    itemTitle: { fontWeight: 'bold', fontSize: 11 },
    itemDate: { fontStyle: 'italic', fontSize: 10 },
    itemSubtitle: { fontStyle: 'italic', fontSize: 10, marginBottom: 3 },
    itemList: { marginLeft: 15, marginTop: 2 },
    bulletPoint: { flexDirection: 'row', marginBottom: 2 },
    bullet: { width: 10, fontSize: 10 },
    bulletText: { flex: 1, fontSize: 10 },
    skillsSection: { marginTop: 5 },
    skillItem: { flexDirection: 'row', marginBottom: 2 },
    skillCategory: { fontWeight: 'bold', fontSize: 10 },
    skillText: { fontSize: 10 },
});

// --- COMPONENT FOR TEMPLATE 1: Academic ---
const AcademicTemplate = ({ resumeData }) => {
    const { personalDetails = {}, summary = '', experience = [], projects = [], education = [], skills = [] } = resumeData;

    return (
        <Document>
            <Page size="A4" style={academicStyles.page}>
                <View style={academicStyles.header}>
                    <View style={academicStyles.headerLeft}>
                        <Text style={academicStyles.name}>{personalDetails.name || 'Your Name'}</Text>
                        <Text style={academicStyles.headerInfo}>{personalDetails.professionalTitle || 'Professional Title'}</Text>
                    </View>
                    <View style={academicStyles.headerRight}>
                        <Text style={academicStyles.headerInfo}>{personalDetails.phone}</Text>
                        <Text style={academicStyles.headerInfo}>{personalDetails.email}</Text>
                        <Text style={academicStyles.headerInfo}>{personalDetails.linkedin}</Text>
                        <Text style={academicStyles.headerInfo}>{personalDetails.github}</Text>
                    </View>
                </View>

                {education.length > 0 && (
                    <View style={academicStyles.section}>
                        <View style={academicStyles.sectionTitleContainer}><Text style={academicStyles.sectionTitle}>Education</Text></View>
                        {education.map((edu, i) => (
                            <View key={i} style={academicStyles.item}>
                                <View style={academicStyles.itemHeader}>
                                    <Text style={academicStyles.itemTitle}>{edu.universityName}</Text>
                                    <Text style={academicStyles.itemDate}>{edu.duration}</Text>
                                </View>
                                <Text style={academicStyles.itemSubtitle}>{edu.degree}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {projects.length > 0 && (
                    <View style={academicStyles.section}>
                        <View style={academicStyles.sectionTitleContainer}><Text style={academicStyles.sectionTitle}>Projects</Text></View>
                        {projects.map((proj, i) => (
                            <View key={i} style={academicStyles.item}>
                                <Text style={academicStyles.itemTitle}>{proj.projectTitle}</Text>
                                {proj.description && <Text style={academicStyles.itemSubtitle}>{proj.description}</Text>}
                                <View style={academicStyles.itemList}>
                                    {(proj.bulletPoints || []).map((point, j) => (
                                        <View key={j} style={academicStyles.bulletPoint}><Text style={academicStyles.bullet}>•</Text><Text style={academicStyles.bulletText}>{point}</Text></View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                
                {experience.length > 0 && (
                     <View style={academicStyles.section}>
                        <View style={academicStyles.sectionTitleContainer}><Text style={academicStyles.sectionTitle}>Experience</Text></View>
                        {experience.map((exp, i) => (
                            <View key={i} style={academicStyles.item}>
                                <View style={academicStyles.itemHeader}>
                                    <Text style={academicStyles.itemTitle}>{exp.jobTitle} at {exp.company}</Text>
                                    <Text style={academicStyles.itemDate}>{exp.duration}</Text>
                                </View>
                                <Text style={academicStyles.itemSubtitle}>{exp.location}</Text>
                                 <View style={academicStyles.itemList}>
                                    <View style={academicStyles.bulletPoint}><Text style={academicStyles.bullet}>•</Text><Text style={academicStyles.bulletText}>{exp.description}</Text></View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                
                {skills.length > 0 && (
                    <View style={academicStyles.section}>
                        <View style={academicStyles.sectionTitleContainer}><Text style={academicStyles.sectionTitle}>Technical Skills</Text></View>
                        <View style={academicStyles.skillsSection}>
                            {skills.map((skillLine, i) => {
                                const parts = skillLine.split(':');
                                const category = parts[0] ? `${parts[0]}: ` : '';
                                const skillsText = parts[1] || '';
                                return (
                                    <View key={i} style={academicStyles.skillItem}>
                                        <Text style={academicStyles.skillCategory}>{category}</Text>
                                        <Text style={academicStyles.skillText}>{skillsText}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
};


// --- STYLES FOR TEMPLATE 2: Professional ---
const professionalStyles = StyleSheet.create({
    page: { fontFamily: 'Helvetica', fontSize: 10, padding: '1.5cm', color: '#333' },
    header: { textAlign: 'center', borderBottomWidth: 2, borderBottomColor: '#333', paddingBottom: 12, marginBottom: 12 },
    name: { fontSize: 26, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 },
    title: { fontSize: 12, color: '#444', marginTop: 4 },
    contactInfo: { textAlign: 'center', fontSize: 9, color: '#555', marginBottom: 15 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#555', paddingBottom: 4, marginBottom: 8 },
    item: { marginBottom: 12 },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 10.5, fontWeight: 'bold' },
    itemSubheader: { fontStyle: 'italic', color: '#444', marginVertical: 2 },
    bulletPoint: { flexDirection: 'row', marginBottom: 4, paddingLeft: 5 },
    bullet: { width: 10, fontSize: 10 },
    bulletText: { flex: 1 },
    summaryText: { lineHeight: 1.5, textAlign: 'justify' },
});


// --- COMPONENT FOR TEMPLATE 2: Professional ---
const ProfessionalTemplate = ({ resumeData }) => {
    const { personalDetails = {}, sections = [], summary = '', experience = [], projects = [], education = [], skills = [] } = resumeData;
    
    const renderBulletPoints = (points) => (points || []).map((point, j) => (
        <View key={j} style={professionalStyles.bulletPoint}><Text style={professionalStyles.bullet}>•</Text><Text style={professionalStyles.bulletText}>{point}</Text></View>
    ));

    return (
        <Document>
            <Page size="A4" style={professionalStyles.page}>
                <View style={professionalStyles.header}><Text style={professionalStyles.name}>{personalDetails.name || ''}</Text><Text style={professionalStyles.title}>{personalDetails.professionalTitle || ''}</Text></View>
                <Text style={professionalStyles.contactInfo}>{personalDetails.phone || ''} • {personalDetails.email || ''}</Text>
                {sections.map((section, i) => {
                    if (section.key === 'summary' && summary) return (<View key={i} style={professionalStyles.section}><Text style={professionalStyles.sectionTitle}>{section.title}</Text><Text style={professionalStyles.summaryText}>{summary}</Text></View>);
                    if (section.key === 'experience' && experience) return (<View key={i} style={professionalStyles.section}><Text style={professionalStyles.sectionTitle}>{section.title}</Text>{experience.map((exp, j) => (<View key={j} style={professionalStyles.item}><View style={professionalStyles.itemHeader}><Text>{exp.jobTitle || ''}</Text><Text>{exp.duration || ''}</Text></View><Text style={professionalStyles.itemSubheader}>{exp.company || ''}</Text>{renderBulletPoints([exp.description])}</View>))}</View>);
                    if (section.key === 'projects' && projects) return (<View key={i} style={professionalStyles.section}><Text style={professionalStyles.sectionTitle}>{section.title}</Text>{projects.map((proj, j) => (<View key={j} style={professionalStyles.item}><View style={professionalStyles.itemHeader}><Text>{proj.projectTitle || ''}</Text></View><Text style={professionalStyles.itemSubheader}>{proj.description || ''}</Text>{renderBulletPoints(proj.bulletPoints)}</View>))}</View>);
                    if (section.key === 'education' && education) return (<View key={i} style={professionalStyles.section}><Text style={professionalStyles.sectionTitle}>{section.title}</Text>{education.map((edu, j) => (<View key={j} style={professionalStyles.item}><View style={professionalStyles.itemHeader}><Text>{edu.universityName || ''}</Text><Text>{edu.duration || ''}</Text></View><Text style={professionalStyles.itemSubheader}>{edu.degree || ''}</Text></View>))}</View>);
                    if (section.key === 'skills' && skills) return (<View key={i} style={professionalStyles.section}><Text style={professionalStyles.sectionTitle}>{section.title}</Text><Text>{(skills || []).join(', ')}</Text></View>);
                    if (section.isCustom) return (<View key={i} style={professionalStyles.section}><Text style={professionalStyles.sectionTitle}>{section.title}</Text>{section.type === 'list-with-bullets' ? ((resumeData[section.key] || []).map((item, j) => (<View key={j} style={professionalStyles.item}><View style={professionalStyles.itemHeader}><Text>{item.title || ''}</Text></View><Text style={professionalStyles.itemSubheader}>{item.subtitle || ''}</Text>{renderBulletPoints(item.bulletPoints)}</View>))) : section.type === 'single-input-and-description' ? ((resumeData[section.key] || []).map((item, j) => (<View key={j} style={professionalStyles.item}><View style={professionalStyles.itemHeader}><Text>{item.title || ''}</Text></View><Text style={professionalStyles.summaryText}>{item.description || ''}</Text></View>))) : (<Text style={professionalStyles.summaryText}>{resumeData[section.key] || ''}</Text>)}</View>);
                    return null;
                })}
            </Page>
        </Document>
    );
};

// --- Main Document Router ---
const PdfDocument = ({ resumeData, templateName = 'Professional' }) => {
    if (templateName.toLowerCase() === 'academic') {
        return <AcademicTemplate resumeData={resumeData} />;
    }
    return <ProfessionalTemplate resumeData={resumeData} />;
};

// --- Generate PDF Function ---
const generatePdf = async (resumeData, templateName) => {
    try {
        const stream = await renderToStream(<PdfDocument resumeData={resumeData} templateName={templateName} />);
        return stream;
    } catch (error) {
        console.error("React-PDF Generation Error:", error);
        throw new Error('Could not generate PDF.');
    }
};

module.exports = { generatePdf };
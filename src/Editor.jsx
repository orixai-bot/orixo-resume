import React from 'react';
import { Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Camera, Linkedin, Globe, Github, Languages, Trophy, Heart } from 'lucide-react';

const Editor = ({
    mousePos, setCurrentPage, selectedTemplate, templates, formData, handleChange, handlePhotoUpload, addExperience, addEducation,
    handleExperienceChange, handleEducationChange, photo, photoShape, setPhotoShape, fileInputRef, downloadResume, getTemplateColor
}) => {
    // Animation styles are moved here
    const editorStyles = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.5); }
            50% { box-shadow: 0 0 40px rgba(168,85,247,0.9); }
        }
        .float { animation: float 3s ease-in-out infinite; }
        .glow { animation: glow 2s ease-in-out infinite; }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-5px) scale(1.02);
        }
        @media print {
            body * { visibility: hidden; }
            #resume-preview, #resume-preview * { visibility: visible; }
            #resume-preview {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: white;
            }
        }
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative">
            <style>{editorStyles}</style>
            <div
                className="absolute pointer-events-none transition-all duration-300"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(40px)'
                }}
            />
            <div className="max-w-7xl mx-auto relative z-10">
                <button onClick={() => setCurrentPage('home')} className="mb-4 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all hover:scale-105">
                    ← Back to Home
                </button>
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10 glow">
                    <div className={`bg-gradient-to-r ${getTemplateColor()} p-8`}>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm float">
                                <Briefcase size={40} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white">{templates.find(t => t.id === selectedTemplate)?.name || 'Resume Creator'}</h1>
                                <p className="mt-2 text-white/80">Design your professional resume</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8 p-8">
                        <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4">
                            {/* Profile Photo Section */}
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Camera size={24} className="text-cyan-400" />
                                    Profile Photo
                                </h2>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="float">
                                        {photo ? (
                                            <img src={photo} alt="Profile" className={`w-32 h-32 object-cover border-4 border-purple-400 shadow-lg ${photoShape === 'rounded' ? 'rounded-full' : 'rounded-xl'}`} />
                                        ) : (
                                            <div className={`w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ${photoShape === 'rounded' ? 'rounded-full' : 'rounded-xl'} border-4 border-purple-400`}>
                                                <Camera size={40} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                    <button onClick={() => fileInputRef.current.click()} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all font-semibold hover:scale-105">
                                        Upload Photo
                                    </button>
                                    <div className="flex gap-3 w-full">
                                        <button onClick={() => setPhotoShape('rounded')} className={`flex-1 py-2 rounded-xl font-semibold transition-all ${photoShape === 'rounded' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/10 text-purple-200 hover:bg-white/20'}`}>
                                            Round
                                        </button>
                                        <button onClick={() => setPhotoShape('square')} className={`flex-1 py-2 rounded-xl font-semibold transition-all ${photoShape === 'square' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/10 text-purple-200 hover:bg-white/20'}`}>
                                            Square
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Personal Info Section */}
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Personal Info</h2>
                                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-4 bg-white/10 border border-white/20 rounded-xl mb-3 text-white placeholder-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all" />
                                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-4 bg-white/10 border border-white/20 rounded-xl mb-3 text-white placeholder-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all" />
                                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-4 bg-white/10 border border-white/20 rounded-xl mb-3 text-white placeholder-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all" />
                                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all" />
                            </div>
                            {/* Social Links Section */}
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Social Links</h2>
                                <input type="text" name="linkedIn" placeholder="LinkedIn" value={formData.linkedIn} onChange={handleChange} className="w-full p-4 bg-white/10 border border-white/20 rounded-xl mb-3 text-white placeholder-purple-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all" />
                                <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full p-4 bg-white/10 border border-white/20 rounded-xl mb-3 text-white placeholder-purple-200 focus:border-green-400 focus:ring-2 focus:ring-green-400 transition-all" />
                                <input type="text" name="github" placeholder="GitHub" value={formData.github} onChange={handleChange} className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 transition-all" />
                            </div>
                            {/* Summary Section */}
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
                                <textarea name="professionalSummary" placeholder="Professional Summary" value={formData.professionalSummary} onChange={handleChange} rows="4" className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all" />
                            </div>
                            {/* Experience Section */}
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
                                {formData.experience.map((exp, i) => (
                                    <div key={i} className="mb-4 p-4 bg-white/5 rounded-xl">
                                        <input type="text" placeholder="Position" value={exp.position} onChange={(e) => handleExperienceChange(i, 'position', e.target.value)} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg mb-2 text-white placeholder-purple-200 focus:border-pink-400 transition-all" />
                                        <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(i, 'company', e.target.value)} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg mb-2 text-white placeholder-purple-200 focus:border-pink-400 transition-all" />
                                        <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleExperienceChange(i, 'duration', e.target.value)} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg mb-2 text-white placeholder-purple-200 focus:border-pink-400 transition-all" />
                                        <textarea placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(i, 'description', e.target.value)} rows="2" className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:border-pink-400 transition-all" />
                                    </div>
                                ))}
                                <button onClick={addExperience} className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all hover:scale-105">Add Experience</button>
                            </div>
                            {/* Education Section */}
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Education</h2>
                                {formData.education.map((edu, i) => (
                                    <div key={i} className="mb-4 p-4 bg-white/5 rounded-xl">
                                        <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(i, 'degree', e.target.value)} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg mb-2 text-white placeholder-purple-200 focus:border-blue-400 transition-all" />
                                        <input type="text" placeholder="School" value={edu.school} onChange={(e) => handleEducationChange(i, 'school', e.target.value)} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg mb-2 text-white placeholder-purple-200 focus:border-blue-400 transition-all" />
                                        <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleEducationChange(i, 'year', e.target.value)} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:border-blue-400 transition-all" />
                                    </div>
                                ))}
                                <button onClick={addEducation} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all hover:scale-105">Add Education</button>
                            </div>
                            {/* Other Sections */}
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
                                <textarea name="skills" placeholder="Your Skills" value={formData.skills} onChange={handleChange} rows="3" className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all" />
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Languages</h2>
                                <textarea name="languages" placeholder="Languages" value={formData.languages} onChange={handleChange} rows="2" className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all" />
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Certifications</h2>
                                <textarea name="certifications" placeholder="Certifications" value={formData.certifications} onChange={handleChange} rows="3" className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 transition-all" />
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 card-hover">
                                <h2 className="text-2xl font-bold text-white mb-4">Hobbies</h2>
                                <textarea name="hobbies" placeholder="Hobbies" value={formData.hobbies} onChange={handleChange} rows="2" className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:border-red-400 focus:ring-2 focus:ring-red-400 transition-all" />
                            </div>
                        </div>
                        {/* Resume Preview */}
                        <div className="sticky top-4">
                            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 glow">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-white">Preview</h2>
                                    <button onClick={downloadResume} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 font-semibold transition-all hover:scale-110 glow">
                                        <Download size={20} /> Download PDF
                                    </button>
                                </div>
                                <div id="resume-preview" className="bg-white p-8 rounded-2xl shadow-2xl min-h-[700px] max-h-[700px] overflow-y-auto">
                                    {photo && (
                                        <div className="flex justify-center mb-6">
                                            <img src={photo} alt="Profile" className={`w-32 h-32 object-cover border-4 border-purple-600 shadow-lg ${photoShape === 'rounded' ? 'rounded-full' : 'rounded-xl'}`} />
                                        </div>
                                    )}
                                    {formData.fullName && (
                                        <div className="mb-6 border-b-4 border-purple-600 pb-4 text-center">
                                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">{formData.fullName}</h1>
                                            <div className="text-sm text-gray-600 space-y-2">
                                                {formData.email && <p className="flex items-center justify-center gap-2"><Mail size={16} className="text-purple-500" />{formData.email}</p>}
                                                {formData.phone && <p className="flex items-center justify-center gap-2"><Phone size={16} className="text-purple-500" />{formData.phone}</p>}
                                                {formData.location && <p className="flex items-center justify-center gap-2"><MapPin size={16} className="text-purple-500" />{formData.location}</p>}
                                                {formData.linkedIn && <p className="flex items-center justify-center gap-2"><Linkedin size={16} className="text-blue-500" />{formData.linkedIn}</p>}
                                                {formData.website && <p className="flex items-center justify-center gap-2"><Globe size={16} className="text-green-500" />{formData.website}</p>}
                                                {formData.github && <p className="flex items-center justify-center gap-2"><Github size={16} className="text-gray-600" />{formData.github}</p>}
                                            </div>
                                        </div>
                                    )}
                                    {formData.professionalSummary && (
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
                                                Professional Summary
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed">{formData.professionalSummary}</p>
                                        </div>
                                    )}
                                    {formData.experience.some(exp => exp.company) && (
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded"></div>
                                                Work Experience
                                            </h2>
                                            {formData.experience.map((exp, i) => (
                                                exp.company && (
                                                    <div key={i} className="mb-4 pl-4 border-l-2 border-purple-200">
                                                        <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                                                        <p className="text-purple-600 font-semibold">{exp.company}</p>
                                                        {exp.duration && <p className="text-sm text-gray-500 italic">{exp.duration}</p>}
                                                        {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}
                                    {formData.education.some(edu => edu.school) && (
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></div>
                                                Education
                                            </h2>
                                            {formData.education.map((edu, i) => (
                                                edu.school && (
                                                    <div key={i} className="mb-3 pl-4 border-l-2 border-blue-200">
                                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                                        <p className="text-blue-600 font-semibold">{edu.school}</p>
                                                        {edu.year && <p className="text-sm text-gray-500 italic">{edu.year}</p>}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}
                                    {formData.skills && (
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
                                                Skills
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed">{formData.skills}</p>
                                        </div>
                                    )}
                                    {formData.languages && (
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded"></div>
                                                Languages
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed">{formData.languages}</p>
                                        </div>
                                    )}
                                    {formData.certifications && (
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded"></div>
                                                Certifications
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed">{formData.certifications}</p>
                                        </div>
                                    )}
                                    {formData.hobbies && (
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded"></div>
                                                Interests & Hobbies
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed">{formData.hobbies}</p>
                                        </div>
                                    )}
                                    <div className="text-center text-gray-400 text-sm mt-8 pt-6 border-t border-gray-200">
                                        Created with Orixo Resume Builder
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
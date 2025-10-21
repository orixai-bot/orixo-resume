import React, { useState, useRef, useEffect } from 'react';
import { FileText, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Camera, Linkedin, Globe, Github, Languages, Trophy, Heart, ArrowRight, Star, Zap, Rocket, Sparkles } from 'lucide-react';

// Import the new components
import Home from './Home';
import Editor from './Editor';

// Define the icons and template data outside the main component to keep it clean
export const Icons = { FileText, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Camera, Linkedin, Globe, Github, Languages, Trophy, Heart, ArrowRight, Star, Zap, Rocket, Sparkles };

export const templates = [
    { id: 1, name: 'Modern Professional', color: 'from-blue-600 to-cyan-600', icon: '💼' },
    { id: 2, name: 'Creative Designer', color: 'from-purple-600 to-pink-600', icon: '🎨' },
    { id: 3, name: 'Tech Expert', color: 'from-green-600 to-teal-600', icon: '💻' },
    { id: 4, name: 'Executive Elite', color: 'from-gray-800 to-gray-600', icon: '👔' },
    { id: 5, name: 'Startup Hustler', color: 'from-orange-600 to-red-600', icon: '🚀' },
    { id: 6, name: 'Academic Scholar', color: 'from-indigo-600 to-blue-600', icon: '🎓' }
];

export default function ResumeMaker() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        professionalSummary: '',
        experience: [{ company: '', position: '', duration: '', description: '' }],
        education: [{ school: '', degree: '', year: '' }],
        skills: '',
        linkedIn: '',
        website: '',
        github: '',
        languages: '',
        certifications: '',
        hobbies: ''
    });
    const [photo, setPhoto] = useState(null);
    const [photoShape, setPhotoShape] = useState('rounded');
    const fileInputRef = useRef(null);

    // Mouse movement effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Handlers
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { company: '', position: '', duration: '', description: '' }]
        });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { school: '', degree: '', year: '' }]
        });
    };

    const handleExperienceChange = (index, field, value) => {
        const newExperience = [...formData.experience];
        newExperience[index][field] = value;
        setFormData({ ...formData, experience: newExperience });
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...formData.education];
        newEducation[index][field] = value;
        setFormData({ ...formData, education: newEducation });
    };

    const startWithTemplate = (templateId) => {
        setSelectedTemplate(templateId);
        setCurrentPage('editor');
    };

    const downloadResume = () => {
        window.print();
    };

    const getTemplateColor = () => {
        const template = templates.find(t => t.id === selectedTemplate);
        return template ? template.color : 'from-purple-600 to-pink-600';
    };

    const commonProps = {
        mousePos,
        setCurrentPage,
        selectedTemplate,
        templates,
        startWithTemplate,
        formData,
        handleChange,
        handlePhotoUpload,
        addExperience,
        addEducation,
        handleExperienceChange,
        handleEducationChange,
        photo,
        photoShape,
        setPhotoShape,
        fileInputRef,
        downloadResume,
        getTemplateColor,
    };

    if (currentPage === 'home') {
        return <Home {...commonProps} />;
    }

    return <Editor {...commonProps} />;
}
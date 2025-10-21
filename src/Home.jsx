import React from 'react';
import { Rocket, Zap, Star, ArrowRight, FileText, Sparkles } from 'lucide-react';

const Home = ({ mousePos, setCurrentPage, startWithTemplate, templates }) => {
    // Animation styles are moved here
    const homeStyles = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.5); }
            50% { box-shadow: 0 0 40px rgba(168,85,247,0.9); }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .float { animation: float 6s ease-in-out infinite; }
        .pulse { animation: pulse 3s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .slide-up { animation: slideUp 0.8s ease-out; }
        .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
        }
        .card-3d:hover {
            transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        }
        @media print {
            body * { visibility: hidden; }
        }
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
            <style>{homeStyles}</style>
            <div
                className="absolute pointer-events-none transition-all duration-300"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(40px)'
                }}
            />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-purple-400 pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 glow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl float">
                                <FileText size={28} className="text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Orixo Resume</span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-white hover:text-purple-300 transition-all font-semibold hover:scale-110">
                                <Rocket size={20} />
                                Home
                            </button>
                            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-white hover:text-purple-300 transition-all font-semibold hover:scale-110">
                                <Zap size={20} />
                                Features
                            </button>
                            <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-white hover:text-purple-300 transition-all font-semibold hover:scale-110">
                                <Star size={20} />
                                Templates
                            </button>
                            <button onClick={() => setCurrentPage('editor')} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all hover:scale-110 glow">
                                Create Free
                            </button>
                        </div>
                        <button onClick={() => setCurrentPage('editor')} className="md:hidden bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold">
                            Create
                        </button>
                    </div>
                </div>
            </nav>
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-12">
                <div className="text-center mb-20 slide-up">
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl float">
                            <Rocket size={60} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">Resume Maker Pro</h1>
                    <p className="text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">Create stunning professional resumes in minutes</p>
                    <button onClick={() => setCurrentPage('editor')} className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-110 shadow-2xl glow">
                        <Zap />
                        Let's Create Free
                        <ArrowRight />
                    </button>
                </div>
                <div id="features" className="grid md:grid-cols-3 gap-6 mb-20">
                    {[
                        { icon: '⚡', title: 'Lightning Fast', desc: 'Create in under 5 minutes' },
                        { icon: '🎨', title: 'Beautiful Designs', desc: '6 professional templates' },
                        { icon: '📱', title: 'Fully Responsive', desc: 'Works on all devices' }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 card-3d slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                            <div className="text-5xl mb-4 float">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-purple-200">{feature.desc}</p>
                        </div>
                    ))}
                </div>
                <div id="templates" className="mb-12">
                    <h2 className="text-5xl font-bold text-white text-center mb-4 flex items-center justify-center gap-3">
                        <Star className="text-yellow-400 pulse" />
                        Choose Your Template
                    </h2>
                    <p className="text-xl text-purple-200 text-center mb-12">Select a template that matches your style</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template, i) => (
                            <div key={template.id} onClick={() => startWithTemplate(template.id)} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all card-3d cursor-pointer slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className={`w-full h-48 bg-gradient-to-br ${template.color} rounded-xl mb-4 flex items-center justify-center text-6xl float glow`}>
                                    {template.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{template.name}</h3>
                                <button className={`w-full py-3 bg-gradient-to-r ${template.color} text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all`}>
                                    Use Template <ArrowRight size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 glow slide-up">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Your Future?</h2>
                    <p className="text-xl text-purple-100 mb-8">Start creating your professional resume now!</p>
                    <button onClick={() => setCurrentPage('editor')} className="bg-white text-purple-600 px-12 py-5 rounded-2xl text-2xl font-bold hover:bg-purple-50 transition-all transform hover:scale-110 shadow-2xl inline-flex items-center gap-3">
                        Let's Create Free <Sparkles />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
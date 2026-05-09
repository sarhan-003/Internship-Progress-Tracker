import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Mail, 
  ExternalLink, 
  Milestone, 
  Check, 
  Loader2, 
  TestTube2, 
  Flag, 
  Kanban, 
  History, 
  Clock,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Save,
  X
} from 'lucide-react';

const defaultProjects = [
  {
    id: '1',
    title: 'NGO Website Template',
    description: 'A modern, accessible, and donation-ready platform for non-profits.',
    status: 'Active Development',
    url: '#'
  }
];

function App() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [lastUpdated, setLastUpdated] = useState('');

  // Project State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: '', url: '' });

  useEffect(() => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    setLastUpdated(new Date().toLocaleDateString('en-US', options));
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description here...',
      status: 'Planning',
      url: '#'
    };
    setProjects([newProject, ...projects]);
    setEditingId(newProject.id);
    setFormData(newProject);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData(project);
  };

  const handleSave = () => {
    setProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } : p));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <>
      {/* Header & Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-brand-blue w-6 h-6" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">Developer Showcase</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isEditMode ? 'bg-brand-blue text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{isEditMode ? 'Exit Edit Mode' : 'Edit Mode'}</span>
            </button>
            <a href="mailto:developer@example.com" className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-blue bg-blue-50 hover:bg-blue-100 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contact Developer</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Projects Hero Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Ongoing Projects</h2>
            {isEditMode && (
              <button 
                onClick={handleAddProject}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {projects.length === 0 && (
              <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-500">No projects available.</p>
              </div>
            )}

            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue to-brand-green"></div>
                
                {isEditMode && editingId !== project.id && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(project)} className="p-2 bg-blue-50 text-brand-blue rounded-full hover:bg-blue-100 transition-colors shadow-sm">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors shadow-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {editingId === project.id ? (
                  <div className="max-w-2xl mx-auto text-left space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200 relative z-10">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                      <input 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status Badge Text</label>
                        <input 
                          type="text" 
                          value={formData.status} 
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          placeholder="e.g. Active Development"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deployed URL</label>
                        <input 
                          type="text" 
                          value={formData.url} 
                          onChange={(e) => setFormData({...formData, url: e.target.value})}
                          placeholder="https://..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => setEditingId(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-md text-sm transition-colors"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white hover:bg-blue-800 font-medium rounded-md text-sm transition-colors shadow-sm"
                      >
                        <Save className="w-4 h-4" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center relative z-0">
                    {/* Status Badge */}
                    {project.status && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-6">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        {project.status}
                      </div>
                    )}

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                      {project.title.includes(':') ? (
                        <>
                          {project.title.split(':')[0]}: <br className="hidden sm:block" />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">
                            {project.title.substring(project.title.indexOf(':') + 1).trim()}
                          </span>
                        </>
                      ) : (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">
                          {project.title}
                        </span>
                      )}
                    </h1>
                    
                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 whitespace-pre-wrap">
                      {project.description}
                    </p>

                    {/* Call to Action */}
                    <a 
                      href={project.url && project.url !== '#' ? project.url : '#'} 
                      target={project.url && project.url !== '#' ? "_blank" : "_self"} 
                      rel="noopener noreferrer" 
                      onClick={(e) => {
                        if(!project.url || project.url === '#') {
                          e.preventDefault();
                          alert('No deployed URL has been set for this project yet.');
                        }
                      }}
                      className={`inline-flex items-center gap-2 px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white shadow-md transition-all transform hover:-translate-y-0.5 ${
                        project.url && project.url !== '#' 
                          ? 'bg-brand-blue hover:bg-blue-800 hover:shadow-lg' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {project.url && project.url !== '#' ? 'View Live Deployed Template' : 'Deployment Pending'}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Visual Progress Tracker (Timeline) */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Milestone className="text-brand-blue w-6 h-6" />
            Global Timeline
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Desktop View (Horizontal) */}
            <div className="hidden md:block">
              <div className="relative flex justify-between items-center w-full">
                {/* Background Line */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
                {/* Progress Line (covers up to step 3) */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 bg-brand-blue z-0"></div>
                
                {/* Step 1: Completed */}
                <div className="relative z-10 flex flex-col items-center group w-32">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white shadow ring-4 ring-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-semibold text-gray-900">Requirements & Design</p>
                    <p className="text-xs text-green-600 font-medium mt-0.5">Completed</p>
                  </div>
                </div>

                {/* Step 2: Completed */}
                <div className="relative z-10 flex flex-col items-center group w-32">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white shadow ring-4 ring-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-semibold text-gray-900">Frontend Layout</p>
                    <p className="text-xs text-green-600 font-medium mt-0.5">Completed</p>
                  </div>
                </div>

                {/* Step 3: In Progress */}
                <div className="relative z-10 flex flex-col items-center group w-32">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-blue text-white shadow ring-4 ring-white animate-pulse">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-semibold text-gray-900">Backend Integration</p>
                    <p className="text-xs text-blue-600 font-medium mt-0.5">In Progress</p>
                  </div>
                </div>

                {/* Step 4: Pending */}
                <div className="relative z-10 flex flex-col items-center group w-32">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 shadow ring-4 ring-white">
                    <TestTube2 className="w-5 h-5" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-500">Testing</p>
                    <p className="text-xs text-gray-400 mt-0.5">Pending</p>
                  </div>
                </div>

                {/* Step 5: Pending */}
                <div className="relative z-10 flex flex-col items-center group w-32">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 shadow ring-4 ring-white">
                    <Flag className="w-5 h-5" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-500">Final Delivery</p>
                    <p className="text-xs text-gray-400 mt-0.5">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View (Vertical) */}
            <div className="md:hidden space-y-6 relative border-l-2 border-gray-200 ml-4 pl-6">
              {/* Step 1: Completed */}
              <div className="relative">
                <div className="absolute -left-11 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">Requirements & Design</p>
                  <p className="text-xs text-green-600 font-medium mt-0.5">Completed</p>
                </div>
              </div>
              
              {/* Step 2: Completed */}
              <div className="relative">
                <div className="absolute -left-11 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">Frontend Layout</p>
                  <p className="text-xs text-green-600 font-medium mt-0.5">Completed</p>
                </div>
              </div>

              {/* Step 3: In Progress */}
              <div className="relative">
                <div className="absolute -left-11 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center ring-4 ring-white shadow-sm animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm">
                  <p className="text-sm font-semibold text-brand-blue">Backend Integration</p>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">In Progress</p>
                </div>
              </div>

              {/* Step 4: Pending */}
              <div className="relative">
                <div className="absolute -left-11 w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center ring-4 ring-white shadow-sm">
                  <TestTube2 className="w-4 h-4" />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm font-medium text-gray-600">Testing</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pending</p>
                </div>
              </div>

              {/* Step 5: Pending */}
              <div className="relative">
                <div className="absolute -left-11 w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center ring-4 ring-white shadow-sm">
                  <Flag className="w-4 h-4" />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm font-medium text-gray-600">Final Delivery</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Kanban / Checklist */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Kanban className="text-brand-blue w-6 h-6" />
            Feature Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Completed Column */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  Completed
                </h3>
                <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full">3</span>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-green-500 transition-shadow hover:shadow-md">
                  <p className="text-sm font-medium text-gray-800">Responsive Navbar</p>
                </div>
                <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-green-500 transition-shadow hover:shadow-md">
                  <p className="text-sm font-medium text-gray-800">Hero Section & UI System</p>
                </div>
                <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-green-500 transition-shadow hover:shadow-md">
                  <p className="text-sm font-medium text-gray-800">About Us Page Layout</p>
                </div>
              </div>
            </div>

            {/* Working On Column */}
            <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-brand-blue flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Working On
                </h3>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">2</span>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-lg shadow-sm border border-blue-50 border-l-4 border-l-blue-500 transition-shadow hover:shadow-md">
                  <p className="text-sm font-medium text-gray-800">Donation Gateway Integration</p>
                </div>
                <div className="bg-white p-3.5 rounded-lg shadow-sm border border-blue-50 border-l-4 border-l-blue-500 transition-shadow hover:shadow-md">
                  <p className="text-sm font-medium text-gray-800">Admin Dashboard UI</p>
                </div>
              </div>
            </div>

            {/* Up Next Column */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                  Up Next
                </h3>
                <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full">2</span>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-gray-400 opacity-80 hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-gray-800">Volunteer Registration Form</p>
                </div>
                <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-gray-400 opacity-80 hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-gray-800">Events Calendar Page</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Updates / Changelog */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <History className="text-brand-blue w-6 h-6" />
            Recent Updates
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              <li className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-start">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 whitespace-nowrap">
                  Today
                </span>
                <div>
                  <p className="text-sm text-gray-800 leading-relaxed">Started integration of payment gateway for donations and database schema planning.</p>
                </div>
              </li>
              <li className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-start">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
                  May 08, 2026
                </span>
                <div>
                  <p className="text-sm text-gray-800 leading-relaxed">Deployed initial landing page layout. Fixed responsive issues on mobile for the hero section.</p>
                </div>
              </li>
              <li className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-start">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
                  May 06, 2026
                </span>
                <div>
                  <p className="text-sm text-gray-800 leading-relaxed">Finalized color palette, typography, and set up core UI components using Tailwind CSS.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Developer Showcase. All rights reserved.
          </p>
          <p className="text-sm font-medium text-gray-600 flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <Clock className="w-4 h-4 text-gray-400" />
            Last Updated: <span className="text-brand-blue font-semibold">{lastUpdated}</span>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

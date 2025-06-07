import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillBar } from './components/SkillBar';
import { ProjectCard } from './components/ProjectCard';
import { CircleSkill } from './components/CircleSkillset';

export default function App() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch skills and projects from your backend
  useEffect(() => {
    fetch('http://localhost:4000/api/projects')
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error('Error fetching skills:', err));

    fetch('http://localhost:4000/api/skills')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  // Build category list
  const categorySet = new Set();
  projects.forEach(p => {
    if (Array.isArray(p.category)) {
      p.category.forEach(cat => categorySet.add(cat));
    } else {
      categorySet.add(p.category);
    }
  });
  const categories = ['All', ...Array.from(categorySet)];

  // Filter by category
  const filtered =
    filter === 'All'
      ? projects
      : projects.filter(p =>
          Array.isArray(p.category)
            ? p.category.includes(filter)
            : p.category === filter
        );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Nav */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center py-4">
          <a href="#" className="text-2xl font-bold text-black">Aaron Rodriguez</a>
          <ul className="hidden md:flex space-x-6">
            {['About', 'Skills', 'Projects', 'Contact'].map(section => (
              <li key={section}><a href={`#${section.toLowerCase()}`} className="hover:text-indigo-500 transition">{section}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <header id="about" className="bg-gradient-to-r from-gray-600 to-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <motion.img
            src="images/aaron.jpg"
            alt="Aaron Rodriguez"
            className="mx-auto rounded-full w-48 h-48 border-4 border-white shadow-lg mb-6 object-cover"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h1 className="text-5xl font-extrabold mb-4" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            Aaron Rodriguez
          </motion.h1>
          <p className="max-w-2xl mx-auto text-lg">Hi, I’m Aaron Rodriguez — a Software Engineer from San Antonio, TX, and a Master’s student in Artificial Intelligence at UT Austin. I love building intelligent systems that solve real world problems. </p>
          <p class="mt-6 mx-auto text-lg leading-relaxed mb-4">When I am not deep diving into model architecures, you’ll probably find me working out, running, cycling, or hiking. </p>
          <h1 class="text-4xl lg:text-3xl font-extrabold mb-4">Fun Fact</h1>
          <span class="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium">I can juggle</span>
          <span class="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium">Rubik's cube in &lt;1min</span>
          <div class="mt-6 flex justify-center space-x-4">
          </div>
        </div>
      </header>

      {/* Skills */}
      <section id="skills" className="container mx-auto px-8 lg:px-20 py-16">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 justify-items-center">
            {skills.map(skill => (
              <CircleSkill key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
      </section>

      {/* Projects with summaries */}
      <section id="projects" className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Projects</h2>
          <div className="flex flex-wrap justify-center mb-6 space-x-2">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full mb-2 ${
                  filter === cat ? 'bg-indigo-600 text-white' : 'border border-indigo-600 text-indigo-600'
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>


      {/* Contact */}
      <footer id="contact" className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h4 className="text-xl font-semibold mb-2">Let's Connect</h4>
          <p>Email: <a href="mailto:aaronnathanrodriguez@gmail.com" className="underline">aaronnathanrodriguez@gmail.com</a></p>
          <p className="mt-2">LinkedIn: <a href="https://www.linkedin.com/in/ARSTMU" className="underline">ARSTMU</a></p>
        </div>
      </footer>
    </div>
  );
}

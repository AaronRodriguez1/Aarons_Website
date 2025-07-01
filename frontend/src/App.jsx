import React, { useState} from 'react';
import { motion } from 'framer-motion';
import { SkillBar } from './components/SkillBar';
import { ProjectCard } from './components/ProjectCard';
import { CircleSkill } from './components/CircleSkillset';

export default function App() {
  const [skills] = useState([
      { name: 'Python', level: 95 },
      { name: 'C++', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML', level: 90 },
      { name: 'SQL/NoSQL', level: 90 },
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 90 },
      { name: 'Agile', level: 100 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 80 },
    ]);


  const [projects] = useState([
    {
        id: 1,
        title: 'Digital Twin AI Assistant',
        category: ['AI/ML', 'Deep Learning', 'NLP', 'Generative AI'],
        link: 'https://github.com/AaronRodriguez1/Digital_Twin_Project',
        img: 'images/digital_twin.jpg',
        summary: [
      'Designed a custom digital twin agent leveraging PyTorch for building and training a customized transformer Model.',
      'Deployed the system on a Pi Zero with TensorFlow Lite, enabling predictive maintenance & real time monitoring/interaction.',
      'Developed efficient training pipelines with batching, tokenization, and loss optimization, ensuring scalable NLP solutions.',
      'Integrated AWS Sagemaker & Cloudwatch to enable continuous retraining, automated deployment, and edge device syncing.',
    ],
      },
      {
        id: 2,
        title: 'Marathon Simulator',
        category: ['AI/ML', 'Deep Learning'],
        link: 'https://github.com/AaronRodriguez1/Marathon_Simulator',
        img: 'images/marathon.jpg',
        summary: [
      'Simulated race performance on real-world marathon routes using Strava activity data and geospatial elevation profiles.',
      'Built a predictive model to estimate per-segment running pace as a function of elevation grade and fatigue, using personal Strava training data.',
      'Parsed GPX files of official marathon courses and applied a regression-based simulator to forecast finishing time and pace distribution.',
      'Applied geospatial preprocessing and trained a linear regression model conditioned on terrain difficulty and distance progression.',
      'Simulated the entire marathon route, applying the model to estimate my per-segment pace and total finish time.',
    ],
      },
      {
        id: 3,
        title: 'SuperTuxKart Autonomous Racing',
        category: ['AI/ML', 'Deep Learning'],
        link: 'https://github.com/AaronRodriguez1/SuperTuxKart',
        img: 'images/Supertuxkart.jpg',
        summary: [
      'Developed PyTorch pipelines to predict vehicle waypoints using track boundaries and raw RGB images from the SuperTuxKart driving simulator.',
      'Implemented three planners (MLP, Transformer, and CNN) with custom loss functions, data loaders, and learning rate schedulers.',
      'Achieved < 0.20 m longitudinal and < 0.60 m lateral error; validated predictions by simulating autonomous driving in PySuperTuxKart.',
    ],    
    },
      {
        id: 4,
        title: 'Agent Librarian Chat Bot',
        category: ['AI/ML', 'Generative AI'],
        link: 'https://github.com/AaronRodriguez1/agent_librarian',
        img: 'images/agent_librarian.jpg',
        summary: [
      'Built a retrieval augmented chatbot that processes video/audio inputs, extracts the text transcripts, and matches them to relevant research papers using Langchain, FAISS, and OpenAI models.',
      'Created a structed dataset in a JSON knowledge base containing research papers, ensuring high accuracy relevant retrieval.',
      'Implemented accuracy evaluation metrics to continuously improve the retrieval performance, fine tuning embeddings.',
    ],
      },
      {
        id: 5,
        title: 'ARTEMIS Framework',
        category: ['DevOps', 'HPC', 'Cloud Computing'], 
        link: 'https://www.sciencedirect.com/science/article/abs/pii/S0010465523001819?via%3Dihub',
        img: 'images/artemis.jpg',
        summary: [
      'Developed and debugged HPC algorithms for electrodynamic simulations using C++/Python & Azure Cloud, in a Agile team.',
      'Designed and containerized workflows using Docker for consistent, reproducible simulation environments.',
      'Leveraged Azure for automating CI/CD workflows and managing large-scale simulations on virtualized environments.',
      'Utilized Linux terminal to manage HPC simulations, large datasets, and manage Git repos for collaborative development.',
    ],
      },
      {
        id: 6,
        title: 'Helmholtz Coil Redesign',
        category: ['Design', 'Research', 'AI/ML'], 
        link: 'https://drive.google.com/file/d/1QgDr9hSOS6OWZN6ofkFEVdZrwOWM0PNS/view?usp=sharing',
        img: 'images/helmholtz.jpg',
        summary: [
      'Rebuilt and designed a Helmholtz coil rotating table system to precisely measure magnetic moments.',
      'Developed Python scripts for real‑time data processing, reducing turnaround by 25%.',
      'Used SolidWorks for assemblies, drawings, simulations and 3D prints prior to fabrication.',
      'Conducted materials research to source optimal components.',
    ],
      },
      {
        id: 7,
        title: 'Microcontroller – Adafruit',
        category: ['Embedded', 'Research'],
        link: 'https://drive.google.com/file/d/1lGjJY4ZmLspQPsHW_qyV8XOkIp9ZakMq/view?usp=sharing',
        img: 'images/microcontroller.jpg',
        summary: [
      'Programmed microcontrollers to automate analog & semiconductor circuit data acquisition.',
      'Wrote Python code to control high‑precision sensors and plot transient responses.',
      'Engineered a software oscilloscope & spectrum analyzer for signal generator testing.',
    ],  },
      {
        id: 8,
        title: 'Conveyor Belt Control System',
        category: 'Controls',
        img: 'images/conveyor.jpg',
        summary: [
      'Implemented PLC logic to auto‑detect and sort boxes on an assembly line.',
      'Used optical sensors and counters to stop after three scans.',
      'Built SCADA simulations in Siemens TIA Portal and retrieved sensor data via OPC.',
    ],  
      },
      {
        id: 9,
        title: 'Spacecraft Reentry Simulation',
        category: ['Simulation', 'Research'],
        link: 'https://drive.google.com/file/d/1sVsSRON682CwLFZJZsSJ5sNKxvyaOq-x/view?usp=sharing',
        img: 'images/reentry.jpg',
        summary: [
      'Built an explicit Euler Python model for spacecraft thermal profiles.',
      'Visualized temperature vs. time with Matplotlib, optimizing grid resolution.',
      'Included temperature‑dependent conductivity and radiation boundary effects.',
    ],  
      },
      {
        id: 10,
        title: 'Summer Research Fellowship',
        category: ['UI/UX', 'Research'],
        link: 'https://tasty-night-9160.glideapp.io/dl/6471c6',
        img: 'images/surf.jpg',
        summary: [
      'Built a science‑demo app using Andriod Studio & Dart for community outreach.',
      'Designed UI/UX using Flutter, focusing on accessibility and user engagement.',
      'Enabled students to explore 17 interactive video demos.',
      'Created a glide app to showcase the project.',
    ],    
      },
      {
        id: 11,
        title: 'Spring Research Fellowship',
        category: ['Research','Design'],
        link: 'https://drive.google.com/file/d/1w3UVfO_1EDTZAkR72K0rlBgeT_bQ0z2f/view?usp=sharing',
        img: 'images/spring_research.jpg',
        summary: [
      'Studied contaminant transport in HVAC using pressure transducers.',
      'Designed a scale‑model HVAC unit in SolidWorks.',
    ],  
      },
      {
        id: 12,
        title: 'Trash Collection Device',
        category: ['Design','Controls'],
        link: 'https://drive.google.com/file/d/1MJ7_lzSh6CtxqITUzT3lU9trQge1i0Hb/view?usp=sharing',
        img: 'images/trash.jpg',
        summary: [
      'Led design & prototyping of an automated river trash collector.',
      'Integrated data‑logging to optimize water sample performance.',
      'Programmed PLCs to automate trash & sample collection cycles.',
    ],  
      },
      {
        id: 13,
        title: 'Drone Leg Connection',
        category: 'Design',
        link: 'https://drive.google.com/file/d/1vAAb5tcuS1KjMux3Up093MAa053dNZYW/view?usp=sharing',
        img: 'images/drone.jpg',
        summary: [
      'Designed leg connection using strength, fatigue, and crack‑growth analyses.',
      'Ran FEA in SolidWorks for Von Mises stress & strain plots.',
      'Built 3D‑printed models to validate deflection & fatigue behavior.',
    ],  
    },
    ]);

  const [filter, setFilter] = useState('All');

  
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

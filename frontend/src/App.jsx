import React, { useMemo, useState } from 'react';
import { NeuralNetwork } from './components/NeuralNetwork';

const layerGap = 6;

const aboutNode = {
  id: 'about',
  label: 'About',
  type: 'info',
  description:
    'Hi, I am Aaron Rodriguez - a software engineer from San Antonio, TX, and a Masters student in Artificial Intelligence at UT Austin. I love building intelligent systems that solve real world problems.',
  image: 'images/aaron.jpg',
  list: [
    'When I am not deep diving into model architectures, you will probably find me working out, running, cycling, or hiking.',
    'Fun fact: I can juggle.',
    "Fun fact: I can solve a Rubik's cube in under 1 minute.",
  ],
};

const contactNode = {
  id: 'contact',
  label: 'Contact',
  type: 'contact',
  description: 'Email and LinkedIn are the fastest ways to reach me.',
  link: 'mailto:aaronnathanrodriguez@gmail.com',
  secondaryLink: 'https://www.linkedin.com/in/ARSTMU',
};

const skillMeta = [
  { name: 'Python', level: 95, keywords: ['python'] },
  { name: 'PyTorch', level: 90, keywords: ['pytorch', 'transformer'] },
  { name: 'Computer Vision', level: 88, keywords: ['computer vision', 'mri', 'vision', 'cv'] },
  { name: 'NLP', level: 88, keywords: ['nlp', 'tokenization', 'language'] },
  { name: 'MLOps/Cloud', level: 85, keywords: ['mlops', 'cloud', 'sagemaker', 'cloudwatch', 'aws'] },
  { name: 'Docker', level: 82, keywords: ['docker', 'container'] },
  { name: 'Linux', level: 90, keywords: ['linux'] },
  { name: 'C++', level: 88, keywords: ['c++', 'cpp', 'c plus plus'] },
  { name: 'Azure', level: 80, keywords: ['azure'] },
  { name: 'PLC/Controls', level: 82, keywords: ['plc', 'scada', 'controls', 'tia portal', 'opc'] },
  { name: 'SolidWorks', level: 78, keywords: ['solidworks', 'fea', 'von mises'] },
  { name: 'Flutter/Dart', level: 75, keywords: ['flutter', 'dart', 'android studio', 'glide'] },
];

function toSkillId(name) {
  return `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function collectProjectText(project) {
  const categories = Array.isArray(project.category) ? project.category : [project.category];
  const summary = Array.isArray(project.summary) ? project.summary.join(' ') : project.summary;
  return `${project.title} ${categories.join(' ')} ${summary}`.toLowerCase();
}

function ringPosition(index, total, radius) {
  const angle = (index / total) * Math.PI * 2;
  const y = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius * 0.7;
  return [y, z];
}

function buildNetwork(layers, skillLinks = {}) {
  const nodes = [];
  const edges = [];
  const layerCenters = {};
  const layerFocus = {};

  layers.forEach((layer, layerIndex) => {
    const centerX = (layerIndex - (layers.length - 1) / 2) * layerGap;
    layerCenters[layer.id] = [centerX, 0, 0];
    const radius = Math.max(1.4, Math.min(3.6, layer.nodes.length * 0.35));
    const focusDistance = Math.max(9, 9 + layer.nodes.length * 0.25);
    layerFocus[layer.id] = focusDistance;

    layer.nodes.forEach((node, idx) => {
      const [y, z] = ringPosition(idx, layer.nodes.length, radius);
      nodes.push({
        ...node,
        layerId: layer.id,
        layerLabel: layer.label,
        position: [centerX, y, z],
      });
    });
  });

  layers.forEach((layer, layerIndex) => {
    const nextLayer = layers[layerIndex + 1];
    if (!nextLayer) return;
    const fromNodes = nodes.filter(node => node.layerId === layer.id);
    const toNodes = nodes.filter(node => node.layerId === nextLayer.id);

    fromNodes.forEach((node, idx) => {
      let targets = [];
      if (layer.id === 'hidden-skills' && nextLayer.id === 'hidden-projects') {
        const projectIds = skillLinks[node.id] || [];
        targets = toNodes.filter(projectNode => projectIds.includes(projectNode.id));
      } else {
        const connections = layerIndex === 0 ? toNodes.length : Math.min(2, toNodes.length);
        for (let offset = 0; offset < connections; offset += 1) {
          targets.push(toNodes[(idx + offset) % toNodes.length]);
        }
      }

      targets.forEach(target => {
        edges.push({
          id: `${node.id}-${target.id}`,
          from: node.position,
          to: target.position,
          fromLayer: node.layerId,
          toLayer: target.layerId,
        });
      });
    });
  });

  return { nodes, edges, layerCenters, layerFocus };
}

export default function App() {
  const [skills] = useState(skillMeta.map(({ name, level }) => ({ name, level })));

  const [projects] = useState([
    {
      id: 'project-1',
      title: 'Digital Twin AI Assistant',
      category: ['AI/ML', 'Deep Learning', 'NLP', 'Generative AI'],
      link: 'https://github.com/AaronRodriguez1/Digital_Twin_Project',
      img: 'images/digital_twin.jpg',
      summary: [
        'Designed a custom digital twin agent leveraging PyTorch for building and training a transformer model.',
        'Deployed the system on a Pi Zero with OnnxRuntime, enabling predictive maintenance and real-time monitoring.',
        'Developed efficient training pipelines with batching, tokenization, and loss optimization, ensuring scalable NLP solutions.',
        'Integrated AWS Sagemaker and Cloudwatch to enable continuous fine-tuning, automated deployment, and edge device syncing.',
      ],
    },
    {
      id: 'project-2',
      title: 'Brain Tumor Classification using MRI Images',
      category: ['AI/ML', 'Deep Learning', 'Computer Vision'],
      link: 'https://drive.google.com/file/d/1-50U7q1kxwXR8REjSF6HT0mCXAh2uqwM/view?usp=sharing',
      img: 'images/tumor.jpg',
      summary: [
        'Applied Transfer Learning (ResNet50) on a Kaggle MRI brain tumor dataset to classify glioma, meningioma, pituitary tumors, and no tumor.',
        'Achieved 96% test accuracy after fine-tuning and used data augmentation to reduce overfitting.',
        'Evaluated performance using a confusion matrix, classification report, and error analysis to identify common misclassifications.',
      ],
    },
    {
      id: 'project-3',
      title: 'Marathon Simulator',
      category: ['AI/ML', 'Deep Learning'],
      link: 'https://github.com/AaronRodriguez1/Marathon_Simulator',
      img: 'images/marathon.jpg',
      summary: [
        'Simulated race performance on real-world marathon routes using Strava activity data and geospatial elevation profiles.',
        'Built a predictive model to estimate per-segment running pace as a function of elevation grade and fatigue, using personal Strava training data.',
        'Parsed GPX files of official marathon courses and applied a regression-based simulator to forecast finishing time and pace distribution.',
        'Applied geospatial preprocessing and trained a linear regression model conditioned on terrain difficulty and distance progression.',
        'Simulated the entire marathon route, applying the model to estimate per-segment pace and total finish time.',
      ],
    },
    {
      id: 'project-4',
      title: 'SuperTuxKart Autonomous Racing',
      category: ['AI/ML', 'Deep Learning'],
      link: 'https://github.com/AaronRodriguez1/SuperTuxKart',
      img: 'images/Supertuxkart.jpg',
      summary: [
        'Developed PyTorch pipelines to predict vehicle waypoints using track boundaries and raw RGB images from the SuperTuxKart driving simulator.',
        'Implemented three planners (MLP, Transformer, and CNN) with custom loss functions, data loaders, and learning rate schedulers.',
        'Achieved < 0.20 m longitudinal and < 0.60 m lateral error; validated predictions by simulating autonomous driving in PySuperTuxKart.',
      ],
    },
    {
      id: 'project-5',
      title: 'Agent Librarian Chat Bot',
      category: ['AI/ML', 'Generative AI'],
      link: 'https://github.com/AaronRodriguez1/agent_librarian',
      img: 'images/agent_librarian.jpg',
      summary: [
        'Built a retrieval augmented chatbot that processes video and audio inputs, extracts transcripts, and matches them to relevant papers using Langchain, FAISS, and OpenAI models.',
        'Created a structured dataset in a JSON knowledge base containing research papers, ensuring high accuracy retrieval.',
        'Implemented accuracy evaluation metrics to continuously improve retrieval performance, fine tuning embeddings.',
      ],
    },
    {
      id: 'project-6',
      title: 'ARTEMIS Framework',
      category: ['DevOps', 'HPC', 'Cloud Computing'],
      link: 'https://www.sciencedirect.com/science/article/abs/pii/S0010465523001819?via%3Dihub',
      img: 'images/artemis.jpg',
      summary: [
        'Developed and debugged HPC algorithms for electrodynamic simulations using C++/Python and Azure Cloud, in an Agile team.',
        'Designed and containerized workflows using Docker for consistent, reproducible simulation environments.',
        'Leveraged Azure for automating CI/CD workflows and managing large-scale simulations on virtualized environments.',
        'Utilized Linux terminal to manage HPC simulations, large datasets, and manage Git repos for collaborative development.',
      ],
    },
    {
      id: 'project-7',
      title: 'Helmholtz Coil Redesign',
      category: ['Design', 'Research', 'AI/ML'],
      link: 'https://drive.google.com/file/d/1QgDr9hSOS6OWZN6ofkFEVdZrwOWM0PNS/view?usp=sharing',
      img: 'images/helmholtz.jpg',
      summary: [
        'Rebuilt and designed a Helmholtz coil rotating table system to precisely measure magnetic moments.',
        'Developed Python scripts for real-time data processing, reducing turnaround by 25%.',
        'Used SolidWorks for assemblies, drawings, simulations and 3D prints prior to fabrication.',
        'Conducted materials research to source optimal components.',
      ],
    },
    {
      id: 'project-8',
      title: 'Microcontroller - Adafruit',
      category: ['Embedded', 'Research'],
      link: 'https://drive.google.com/file/d/1lGjJY4ZmLspQPsHW_qyV8XOkIp9ZakMq/view?usp=sharing',
      img: 'images/microcontroller.jpg',
      summary: [
        'Programmed microcontrollers to automate analog and semiconductor circuit data acquisition.',
        'Wrote Python code to control high-precision sensors and plot transient responses.',
        'Engineered a software oscilloscope and spectrum analyzer for signal generator testing.',
      ],
    },
    {
      id: 'project-9',
      title: 'Conveyor Belt Control System',
      category: 'Controls',
      img: 'images/conveyor.jpg',
      summary: [
        'Implemented PLC logic to auto-detect and sort boxes on an assembly line.',
        'Used optical sensors and counters to stop after three scans.',
        'Built SCADA simulations in Siemens TIA Portal and retrieved sensor data via OPC.',
      ],
    },
    {
      id: 'project-10',
      title: 'Spacecraft Reentry Simulation',
      category: ['Simulation', 'Research'],
      link: 'https://drive.google.com/file/d/1sVsSRON682CwLFZJZsSJ5sNKxvyaOq-x/view?usp=sharing',
      img: 'images/reentry.jpg',
      summary: [
        'Built an explicit Euler Python model for spacecraft thermal profiles.',
        'Visualized temperature vs. time with Matplotlib, optimizing grid resolution.',
        'Included temperature-dependent conductivity and radiation boundary effects.',
      ],
    },
    {
      id: 'project-11',
      title: 'Summer Research Fellowship',
      category: ['UI/UX', 'Research'],
      link: 'https://tasty-night-9160.glideapp.io/dl/6471c6',
      img: 'images/surf.jpg',
      summary: [
        'Built a science demo app using Android Studio and Dart for community outreach.',
        'Designed UI/UX using Flutter, focusing on accessibility and user engagement.',
        'Enabled students to explore 17 interactive video demos.',
        'Created a glide app to showcase the project.',
      ],
    },
    {
      id: 'project-12',
      title: 'Spring Research Fellowship',
      category: ['Research', 'Design'],
      link: 'https://drive.google.com/file/d/1w3UVfO_1EDTZAkR72K0rlBgeT_bQ0z2f/view?usp=sharing',
      img: 'images/spring_research.jpg',
      summary: [
        'Studied contaminant transport in HVAC using pressure transducers.',
        'Designed a scale-model HVAC unit in SolidWorks.',
      ],
    },
    {
      id: 'project-13',
      title: 'Trash Collection Device',
      category: ['Design', 'Controls'],
      link: 'https://drive.google.com/file/d/1MJ7_lzSh6CtxqITUzT3lU9trQge1i0Hb/view?usp=sharing',
      img: 'images/trash.jpg',
      summary: [
        'Led design and prototyping of an automated river trash collector.',
        'Integrated data-logging to optimize water sample performance.',
        'Programmed PLCs to automate trash and sample collection cycles.',
      ],
    },
    {
      id: 'project-14',
      title: 'Drone Leg Connection',
      category: 'Design',
      link: 'https://drive.google.com/file/d/1vAAb5tcuS1KjMux3Up093MAa053dNZYW/view?usp=sharing',
      img: 'images/drone.jpg',
      summary: [
        'Designed leg connection using strength, fatigue, and crack-growth analyses.',
        'Ran FEA in SolidWorks for Von Mises stress and strain plots.',
        'Built 3D-printed models to validate deflection and fatigue behavior.',
      ],
    },
  ]);

  const { layers, skillLinks } = useMemo(() => {
    const projectSkillMatches = projects.map(project => {
      const text = collectProjectText(project);
      const matches = skillMeta
        .filter(skill => skill.keywords.some(keyword => text.includes(keyword)))
        .map(skill => skill.name);
      return { project, matches };
    });

    const skillLinksMap = {};
    skillMeta.forEach(skill => {
      skillLinksMap[toSkillId(skill.name)] = projectSkillMatches
        .filter(match => match.matches.includes(skill.name))
        .map(match => match.project.id);
    });

    return {
      skillLinks: skillLinksMap,
      layers: [
        {
          id: 'input',
          label: 'About',
          nodes: [aboutNode],
        },
        {
          id: 'hidden-skills',
          label: 'Skills',
          nodes: skills.map(skill => ({
            id: toSkillId(skill.name),
            label: skill.name,
            type: 'skill',
            description: `${skill.name} proficiency at ${skill.level}%.`,
            detail: `${skill.level}%`,
          })),
        },
        {
          id: 'hidden-projects',
          label: 'Projects',
          nodes: projectSkillMatches.map(({ project, matches }) => ({
            id: project.id,
            label: project.title,
            type: 'project',
            description: project.summary[0],
            list: project.summary,
            link: project.link,
            image: project.img,
            matchedSkills: matches,
          })),
        },
        {
          id: 'output',
          label: 'Contact',
          nodes: [contactNode],
        },
      ],
    };
  }, [projects, skills]);

  const { nodes, edges, layerCenters, layerFocus } = useMemo(
    () => buildNetwork(layers, skillLinks),
    [layers, skillLinks]
  );

  const [activeLayer, setActiveLayer] = useState(layers[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const selectedNode = useMemo(
    () => nodes.find(node => node.id === selectedNodeId) || null,
    [nodes, selectedNodeId]
  );

  const focusTarget = useMemo(() => {
    if (selectedNode) return selectedNode.position;
    return layerCenters[activeLayer] || [0, 0, 0];
  }, [activeLayer, layerCenters, selectedNode]);

  const handleNodeSelect = node => {
    setSelectedNodeId(node.id);
    setActiveLayer(node.layerId);
  };

  return (
    <div className="neural-shell">
      <NeuralNetwork
        nodes={nodes}
        edges={edges}
        activeLayerId={activeLayer}
        selectedNodeId={selectedNodeId}
        layerCenters={layerCenters}
        layerFocus={layerFocus}
        focusTarget={focusTarget}
        onNodeSelect={handleNodeSelect}
        onClearSelection={() => setSelectedNodeId(null)}
      />

      <div className="neural-overlay">
        <header className="neural-header">
          <div>
            <h1 className="neural-title">Aaron Rodriguez</h1>
            <p className="neural-subtitle">
              Explore the layers. Tap a node to zoom in and reveal focus.
            </p>
          </div>
          <div className="neural-layer-bar">
            {layers.map(layer => (
              <button
                key={layer.id}
                className={`neural-layer-chip ${
                  activeLayer === layer.id ? 'is-active' : ''
                }`}
                onClick={() => {
                  setSelectedNodeId(null);
                  setActiveLayer(layer.id);
                }}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </header>

        <section className="neural-footer">
          <div className="neural-hint">
            Tap a node to zoom. Tap background to reset. Pinch to zoom.
          </div>
        </section>
      </div>

      {selectedNode && (
        <div
          className={`neural-card ${
            selectedNode.type === 'info' ? 'is-about' : 'is-project'
          }`}
          role="dialog"
          aria-live="polite"
        >
          {selectedNode.image && (
            <div className="neural-card-media">
              <img src={selectedNode.image} alt={selectedNode.label} />
            </div>
          )}
          <div className="neural-card-body">
            <p className="neural-card-kicker">{selectedNode.layerLabel}</p>
            <h2 className="neural-card-title">{selectedNode.label}</h2>
            <p className="neural-card-text">{selectedNode.description}</p>
            {Array.isArray(selectedNode.list) && (
              <ul className="neural-card-list">
                {selectedNode.list.map((item, index) => (
                  <li key={`${selectedNode.id}-${index}`}>{item}</li>
                ))}
              </ul>
            )}
            <div className="neural-card-actions">
              {selectedNode.link && (
                <a
                  className="neural-card-link"
                  href={selectedNode.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open project
                </a>
              )}
              {selectedNode.secondaryLink && (
                <a
                  className="neural-card-link"
                  href={selectedNode.secondaryLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const getProjects = (req, res) => {
    const projects = [
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
  ];

  res.json(projects);
};

module.exports = { getProjects };
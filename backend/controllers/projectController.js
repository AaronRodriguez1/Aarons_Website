const projects = [
  { id: 1, title: 'Digital Twin AI Assistant', link: 'https://github.com/AaronRodriguez1/Digital_Twin_Project', category: 'AI' },
  { id: 2, title: 'Marathon Simulator', link: 'https://github.com/AaronRodriguez1/Marathon_Simulator', category: 'Simulation' },
  // ... more entries
];

exports.getProjects = (req, res) => {
  res.json(projects);
};
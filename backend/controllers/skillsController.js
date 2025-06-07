const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 88 },
  { name: 'Docker', level: 75 },
  { name: 'AWS', level: 70 }
];

exports.getSkills = (req, res) => {
  res.json(skills);
};
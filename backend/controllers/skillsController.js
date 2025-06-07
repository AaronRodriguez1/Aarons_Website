const getSkills = (req, res) => {
    const skills = [
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
  ];

  res.json(skills);
};

module.exports = { getSkills };


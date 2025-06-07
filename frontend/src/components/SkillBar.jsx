import React from 'react';
export function SkillBar({ name, level }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-indigo-600 h-4 rounded-full transition-all" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

// frontend/src/components/CircleSkill.jsx
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function CircleSkill({ name, level }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-16 h-16">
        <CircularProgressbar
          value={level}
          text={`${level}%`}
          styles={buildStyles({
            textColor: '#4B5563',
            pathColor: '#6366F1',
            trailColor: '#E5E7EB',
            textSize: '22px',
          })}
        />
      </div>
      <p className="text-lg font-medium text-gray-700">{name}</p>
    </div>
  );
}

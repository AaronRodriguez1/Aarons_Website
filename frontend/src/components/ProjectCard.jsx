import React from 'react';

export function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        {/* Summary as bullet list */}
        {Array.isArray(project.summary) ? (
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {project.summary.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 text-sm">{project.summary}</p>
        )}
      </div>
    </div>
  );
}

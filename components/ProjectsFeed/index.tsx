import React, { useEffect, useState } from 'react';

import styl from './index.styl';
import makeClassName, { ClassName } from '../../helpers/className';

const cn = makeClassName(styl, 'ProjectsFeed');

const fetchProjects = async (): Promise<Github.Repo[]> => {
  const projects: Github.Repo[] = await (await fetch('https://api.github.com/users/dezmound/repos')).json();

  for (const project of projects) {
    console.log(project);
  }

  return projects;
};

export interface ProjectFeedProps {
  projects?: Github.Repo[],
  className?: string,
  injectClassName?: ClassName
}

const getRepoImgSrc = (name: string, resolution: string = '1000:1000', quantity: string = '75') => {
  return `/render/?path=${name}&resolution=${resolution}&quantity=${quantity}`;
};

const drawProject = (project: Github.Repo) => {
  return <div key={project.id} className={cn.e('Project').toString()}>
    <div className={cn.e('ProjectImage').toString()}>
      <img src={getRepoImgSrc(project.full_name)} alt={project.name} />
    </div>
    <div className={cn.e('ProjectName').toString()}>
      {project.name}
    </div>
    <div className={cn.e('ProjectDescription').toString()}>
      {project.description}
    </div>
  </div>;
};

const ProjectFeed: React.FC<ProjectFeedProps> = ({ projects, className, injectClassName }) => {
  const [projectsInState, setProjects] = useState(projects || []);

  useEffect(() => {
    if (injectClassName) {
      cn.inject(injectClassName);
    }

    fetchProjects().then((projects) => {
      setProjects(projects);
    });
  }, []);

  return <div className={cn.concat(className).toString()}>
    {projectsInState.map(drawProject)}
  </div>;
};

export default ProjectFeed;

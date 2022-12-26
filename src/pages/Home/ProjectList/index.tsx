import React, { useEffect, useState } from 'react';
import CardProject from 'components/CardProject';
import Sliders from 'components/Slider';
import Typo from 'components/Typo';
import { Link } from 'react-router-dom';
import {
  getProjects,
  getProjectsByStatus,
  searchProjects,
} from 'apis/projects';
import { IProject } from './types';
import Loading from 'components/Loading';
import { routes } from 'constant/routes';

const ProjectList = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProjects();
      // const data = await searchProjects('');
      setProjects(data);
    })();
  }, []);

  return (
    <div className="mb-16">
      <Typo isBold size="larger" className="text-center">
        Dự án tình nguyện
      </Typo>
      <Typo className="text-center my-8">
        Hãy lựa chọn dự án mà bạn quan tâm
      </Typo>
      {projects.length ? (
        <Sliders
          slidesToScroll={4}
          slidesToShow={4}
          isDot={false}
          isInfinie={projects.length > 4}
        >
          {projects.map(project => (
            <div className="px-4 h-full">
              <CardProject {...project} />
            </div>
          ))}
        </Sliders>
      ) : (
        <Loading />
      )}
      <div className="text-center mt-4">
        <Link to={routes.PROJECTS} className="text-primary-500">
          Xem tất cả ({projects.length})
        </Link>
      </div>
    </div>
  );
};

export default ProjectList;

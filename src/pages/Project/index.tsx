import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import { getProjects } from 'apis/projects';
import { IProject } from 'pages/Home/ProjectList/types';
import CardProject from 'components/CardProject';
import Grid from '@mui/material/Grid';
import CardSkeleton from 'components/Skeleton/Card';

const ProjectPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  return (
    <div className="container my-10">
      <Typo isBold size="larger" className="text-center">
        Dự án tình nguyện
      </Typo>
      <Typo className="text-center my-8">
        Hãy lựa chọn dự án mà bạn quan tâm
      </Typo>
      <div className="mt-4">
        {projects.length ? (
          <Grid container spacing={4}>
            {projects.map(project => (
              <Grid item xs={6} md={4} xl={3}>
                <CardProject {...project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <CardSkeleton />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;

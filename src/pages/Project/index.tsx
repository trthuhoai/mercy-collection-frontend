import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import { getProjectsByStatus } from 'apis/projects';
import { IProject } from 'pages/Home/ProjectList/types';
import CardProject from 'components/CardProject';
import Grid from '@mui/material/Grid';
import CardSkeleton from 'components/Skeleton/Card';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TABS } from 'constant';

const ProjectPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProjectsByStatus(tabValue);
        setProjects(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [tabValue]);

  return (
    <div className="container my-10">
      <Typo isBold size="larger" className="text-center">
        Dự án tình nguyện
      </Typo>
      <Typo className="text-center my-8">
        Hãy lựa chọn dự án mà bạn quan tâm
      </Typo>
      <div>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            variant="fullWidth"
          >
            {TABS.map(tab => (
              <Tab label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
      </div>
      <div className="mt-8">
        {loading ? (
          <CardSkeleton />
        ) : projects.length ? (
          <Grid container spacing={4}>
            {projects.map(project => (
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <CardProject {...project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typo align="center">Không có dự án nào</Typo>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;

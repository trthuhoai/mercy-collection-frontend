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
import Pagination from '@mui/material/Pagination';
import { ITEMS_PER_PAGE } from 'constant/pagination';
import { pagination } from 'untils';

const ProjectPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProjectsByStatus(tabValue);
        setProjects(data);
        setPage(1);
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
          <>
            <Grid container spacing={4}>
              {pagination(projects, ITEMS_PER_PAGE, page).map(project => (
                <Grid item xs={12} sm={6} md={4} xl={3}>
                  <CardProject {...project} />
                </Grid>
              ))}
            </Grid>
            <div className="flex justify-center mt-10">
              <Pagination
                page={page}
                onChange={(e, page) => setPage(page)}
                count={Math.ceil(projects.length / ITEMS_PER_PAGE)}
                color="primary"
              />
            </div>
          </>
        ) : (
          <Typo align="center">Không có dự án nào</Typo>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;

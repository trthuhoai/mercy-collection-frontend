import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { searchProjects } from 'apis/projects';
import CardProject from 'components/CardProject';
import CardSkeleton from 'components/Skeleton/Card';
import Typo from 'components/Typo';
import { ITEMS_PER_PAGE } from 'constant/pagination';
import { IProject } from 'pages/Home/ProjectList/types';
import { useSearch } from 'store/search';
import { pagination } from 'untils';

const Search = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { value } = useSearch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await searchProjects(value);
        setProjects(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [value]);

  return (
    <div className="container my-10">
      <Typo size="large" align="center" isBold className="mb-10 text-gray-700">
        Tìm kiếm với từ khóa "{value}" có {projects.length} kết quả.
      </Typo>
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
  );
};

export default Search;

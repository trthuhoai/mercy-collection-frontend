import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const CardSkeleton = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6} md={4} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </Grid>
      <Grid item xs={6} md={4} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </Grid>
      <Grid item xs={6} md={4} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </Grid>
      <Grid item xs={6} md={4} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </Grid>
      <Grid item xs={6} md={4} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </Grid>
      <Grid item xs={6} md={4} xl={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </Grid>
    </Grid>
  );
};

export default CardSkeleton;

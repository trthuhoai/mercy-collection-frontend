import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { getCampaigns } from 'apis/projects';
import CardCampaign from 'components/CardCampaign';
import Typo from 'components/Typo';
import { ICampaign } from 'pages/Home/CampaignList/types';
import CardSkeleton from 'components/Skeleton/Card';

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    })();
  }, []);

  return (
    <div className="container my-10">
      <Typo isBold size="larger" className="text-center">
        Dự án đang gây quỹ
      </Typo>
      <Typo className="text-center my-8">
        Hãy lựa chọn dự án mà bạn quan tâm
      </Typo>
      <div className="mt-4">
        {campaigns.length ? (
          <Grid container spacing={4}>
            {campaigns.map(campaign => (
              <Grid item xs={6} md={4} xl={3}>
                <CardCampaign {...campaign} />
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

export default CampaignPage;

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { getCampaignsByStatus } from 'apis/projects';
import CardCampaign from 'components/CardCampaign';
import Typo from 'components/Typo';
import { ICampaign } from 'pages/Home/CampaignList/types';
import CardSkeleton from 'components/Skeleton/Card';
import { TABS } from 'constant';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getCampaignsByStatus(tabValue);
        setCampaigns(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [tabValue]);

  return (
    <div className="container my-10">
      <Typo isBold size="larger" className="text-center">
        Dự án đang gây quỹ
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
        ) : campaigns.length ? (
          <Grid container spacing={4}>
            {campaigns.map(campaign => (
              <Grid item xs={6} md={4} xl={3}>
                <CardCampaign {...campaign} />
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

export default CampaignPage;

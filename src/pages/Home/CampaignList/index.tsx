import React, { useEffect, useState } from 'react';
import CardCampaign from 'components/CardCampaign';
import Sliders from 'components/Slider';
import Typo from 'components/Typo';
import { Link } from 'react-router-dom';
import { getCampaigns } from 'apis/projects';
import { ICampaign } from './types';
import Loading from 'components/Loading';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    })();
  }, []);

  return (
    <div className="mb-16">
      <Typo isBold size="larger" className="text-center">
        Dự án đang gây quỹ
      </Typo>
      <Typo className="text-center my-8">
        Hãy lựa chọn dự án mà bạn quan tâm
      </Typo>
      {campaigns.length ? (
        <Sliders slidesToScroll={3} slidesToShow={3} isDot={false}>
          {campaigns.map(campaign => (
            <div className="px-4">
              <CardCampaign {...campaign} />
            </div>
          ))}
        </Sliders>
      ) : (
        <Loading />
      )}
      <div className="text-center mt-4">
        <Link to="#" className="text-primary-500">
          Xem tất cả ({campaigns.length})
        </Link>
      </div>
    </div>
  );
};

export default CampaignList;

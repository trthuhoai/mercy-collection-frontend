import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { getCampaignsDetail } from 'apis/projects';
import Typo from 'components/Typo';
import { useParams } from 'react-router-dom';
import { ICampaignDetail } from './types';
import Loading from 'components/Loading';
import { ECategoryProject } from 'constant/types';

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaigns, setCampaigns] = useState<ICampaignDetail | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getCampaignsDetail(id);
        setCampaigns(data);
      }
    })();
  }, [id]);

  if (!campaigns) return <Loading />;

  return (
    <div className="container my-10">
      <div className="flex gap-8">
        <div className="flex-1">
          <img
            src={campaigns.pictureUrl}
            alt="Ảnh từ thiện"
            className="mx-auto max-h-[576px] rounded-md"
          />
          <div className="mt-10">
            <Typo size="large" isBold>
              Nội dung:
            </Typo>
            <Typo className="mt-2 text-justify">{campaigns.content}</Typo>
          </div>
        </div>
        <div className="sticky top-16 w-1/3 h-fit">
          <div className="bg-white rounded-md py-8 px-10">
            <div className="bg-primary-500 rounded-md text-white px-4 py-2 mb-4 mx-auto w-fit">
              {ECategoryProject[campaigns.category]}
            </div>
            <Typo size="larger" isBold>
              {campaigns.title}
            </Typo>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Mục tiêu dự án:</Typo>
                <Typo>{campaigns.goal.toLocaleString()}VND</Typo>
              </div>
              <div className="relative w-full h-2 my-4">
                <div className="absolute bg-primary-200 inset-0 rounded-md" />
                <div
                  style={{
                    width: `${Math.floor(
                      (campaigns.donated / campaigns.goal) * 100,
                    )}%`,
                  }}
                  className="absolute bg-primary-500 inset-0 rounded-md"
                />
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Đã đạt được:</Typo>
                <Typo>{campaigns.donated.toLocaleString()}VND</Typo>
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Email người tổ chức:</Typo>
                <Typo>{campaigns.email}</Typo>
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Thời gian bắt đầu:</Typo>
                <Typo>
                  {campaigns.startAt} {campaigns.startTime}
                </Typo>
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Thời gian kết thúc:</Typo>
                <Typo>
                  {campaigns.endAt} {campaigns.endTime}
                </Typo>
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Địa điểm:</Typo>
                <Typo>{campaigns.location}</Typo>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button size="large" variant="contained">
                Ủng hộ ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;

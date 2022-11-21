import React, { useEffect, useState } from 'react';
import { getProjectsDetail } from 'apis/projects';
import { useParams } from 'react-router-dom';
import { IProjectDetail } from './types';
import Typo from 'components/Typo';
import Button from '@mui/material/Button';
import Loading from 'components/Loading';
import { ECategoryProject } from 'constant/types';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<IProjectDetail | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getProjectsDetail(id);
        setProjects(data);
      }
    })();
  }, [id]);

  if (!projects) return <Loading />;

  return (
    <div className="bg-detail container py-20 bg-cover">
      <div className="flex gap-8">
        <div className="flex-1">
          <img
            src={projects.pictureUrl}
            alt="Ảnh từ thiện"
            className="w-full rounded-md"
          />
        </div>
        <div className="sticky top-20 w-[448px]">
          <div className="bg-white rounded-md py-8 px-10">
            <div className="bg-primary-500 rounded-md text-white px-4 py-2 mb-4 mx-auto w-fit">
              {ECategoryProject[projects.category]}
            </div>
            <Typo size="larger" isBold>
              {projects.title}
            </Typo>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Mục tiêu dự án:</Typo>
                <Typo>{projects.people.toLocaleString()} người</Typo>
              </div>
              <div className="relative w-full h-2 my-4">
                <div className="absolute bg-primary-200 inset-0 rounded-md" />
                <div
                  style={{
                    width: `${Math.floor(
                      (projects.registered / projects.people) * 100,
                    )}%`,
                  }}
                  className="absolute bg-primary-500 inset-0 rounded-md"
                />
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Đã đạt được:</Typo>
                <Typo>{projects.registered.toLocaleString()} người</Typo>
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Thời gian bắt đầu:</Typo>
                <Typo>
                  {projects.startAt} {projects.startTime}
                </Typo>
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Thời gian kết thúc:</Typo>
                <Typo>
                  {projects.endAt} {projects.endTime}
                </Typo>
              </div>
              <div className="flex items-center justify-between mb-4 last:mb-0">
                <Typo>Địa điểm:</Typo>
                <Typo>{projects.location}</Typo>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button size="large" variant="contained">
                Tham gia ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

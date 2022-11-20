import React from 'react';
import Typo from 'components/Typo';
import { IProject } from 'pages/Home/ProjectList/types';
import { ECategoryProject } from 'constant/types';

const Card = ({
  id,
  title,
  pictureUrl,
  category,
  registered,
  people,
}: IProject) => {
  return (
    <div className="mx-4 flex flex-col rounded cursor-pointer group shadow-lg">
      <div className="relative flex-1 overflow-hidden rounded-t">
        <img
          src={pictureUrl}
          alt="anh"
          className="w-full h-full rounded-t group-hover:scale-110 transition-all"
        />
        <div className="absolute top-4 right-4 bg-primary-500 rounded-md text-white px-4 py-2">
          {ECategoryProject[category]}
        </div>
      </div>
      <div className="flex-1 rounded-b p-4 group-hover:bg-primary-50">
        <Typo className="line-clamp-2" isBold size="large">
          {title}
        </Typo>
        <div className="relative h-2 mt-8">
          <div className="absolute bg-primary-100 inset-0 rounded-md" />
          <div
            style={{ width: `${Math.floor((registered / people) * 100)}%` }}
            className="absolute bg-primary-500 inset-0 rounded-md"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Typo className="text-primary-500">
            {registered.toLocaleString()} người
          </Typo>
          <Typo className="text-primary-500">
            {Math.floor((registered / people) * 100)}%
          </Typo>
        </div>
        <div className="mt-4">
          <Typo>với mục tiêu {people.toLocaleString()} người</Typo>
        </div>
      </div>
    </div>
  );
};

export default Card;

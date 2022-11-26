import React, { useEffect, useState } from 'react';
import { getMyCampaigns } from 'apis/projects';
import Table from 'components/Table';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Loading from 'components/Loading';
import { headers } from './constant';
import { ECategoryProject } from 'constant/types';
import RemoveIcon from '@mui/icons-material/Remove';
import CreateProject from './create';
import { ICampaignDetail } from 'pages/Campaign/Detail/types';

const Campaign = () => {
  const [listCampaign, setListCampaign] = useState<ICampaignDetail[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await getMyCampaigns();
      setListCampaign(data.data);
    })();
  }, []);

  const rows = listCampaign.map(
    ({
      title,
      goal,
      donated,
      category,
      deadlineTime,
      deadline,
      endAt,
      endTime,
      startAt,
      startTime,
      location,
    }) => ({
      title,
      goal,
      donated,
      category: ECategoryProject[category],
      deadline: deadlineTime + ' ' + deadline,
      endTime: endTime + ' ' + endAt,
      startTime: startTime + ' ' + startAt,
      location,
    }),
  );

  if (!listCampaign.length) return <Loading />;

  return (
    <div className="my-10 container">
      <div className="">
        {isCreate ? <CreateProject /> : <Table headers={headers} rows={rows} />}
      </div>
      <div
        className="fixed bottom-28 right-28"
        onClick={() => setIsCreate(!isCreate)}
      >
        <Tooltip
          placement="top"
          title={isCreate ? 'Hiển thị danh sách' : 'Thêm dự án'}
        >
          <Fab color="primary" aria-label="add">
            {isCreate ? <RemoveIcon /> : <AddIcon />}
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default Campaign;

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getProjects } from 'apis/projects';
import { IProjectDetail } from 'pages/Project/Detail/types';
import Loading from 'components/Loading';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IMemberDetail } from '../ManagerMember/types';
import { getMembers } from 'apis/admin';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Statistic = () => {
  const [listProject, setListProject] = useState<IProjectDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [listMember, setListMember] = useState<IMemberDetail[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setListProject(data);
        const dataMember = await getMembers();
        setListMember(dataMember);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Thống kê năm ${year}`,
      },
    },
  };

  const labels = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  const data = {
    labels: labels.map(value => `Tháng ${value}`),
    datasets: [
      {
        label: 'Dự án',
        data: labels.map(value =>
          listProject?.reduce((pre, crr) => {
            return new Date(crr.createdAt).getMonth() + 1 === Number(value) &&
              new Date(crr.createdAt).getFullYear() === year
              ? pre + 1
              : pre;
          }, 0),
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Người dùng',
        data: labels.map(value =>
          listMember?.reduce((pre, crr) => {
            return new Date(crr.createdAt).getMonth() + 1 === Number(value) &&
              new Date(crr.createdAt).getFullYear() === year
              ? pre + 1
              : pre;
          }, 0),
        ),
        borderColor: '#4caf50',
        backgroundColor: '#8bc34a',
      },
    ],
  };
  if (loading) return <Loading />;
  return (
    <div className="container w-3/4 my-10">
      <div className="text-right">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Năm</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Năm"
            onChange={e => setYear(+e.target.value)}
          >
            {[...Array(5)].map((v, index) => (
              <MenuItem
                value={
                  index === 0
                    ? new Date().getFullYear()
                    : new Date().getFullYear() - index
                }
              >
                {index === 0
                  ? new Date().getFullYear()
                  : new Date().getFullYear() - index}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Statistic;

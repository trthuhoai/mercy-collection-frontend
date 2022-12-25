import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import { getUserById } from 'apis/users';
import { ETabsUser, IUser } from './types';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Statistic from './Statistic';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import Info from './Info';

const User = () => {
  const [user, setUser] = useState<IUser>();
  const [valueTabs, setValueTabs] = useState(ETabsUser.STATISTIC);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getUserById(id);
        setUser(data);
      }
    })();
  }, [id]);

  const handleChange = (_, newValue) => {
    setValueTabs(newValue);
  };

  if (!user) return <Loading />;

  const { info, statistic } = user;

  return (
    <>
      <div className="md:my-6 w-full">
        <div className="relative h-52 lg:h-72 bg-gradient-to-r from-violet-100 via-purple-100 to-pink-100 rounded-tl-[90px]">
          {info.cover && (
            <img
              src={info.cover}
              alt="Ảnh bìa"
              className="w-full h-full  rounded-tl-[90px]"
            />
          )}
        </div>
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-6 -translate-y-1/2 ">
            <div className="relative w-36 h-36">
              <img
                src={info.picture || '/avartar.png'}
                alt="Anh dai dien"
                className="rounded-full w-full h-full"
              />
            </div>
            <div className="sm:self-end">
              <Typo className="mb-2" size="larger" isBold>
                {info.name}
              </Typo>
              <Typo>{info.email}</Typo>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <TabContext value={valueTabs}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="fullWidth">
                  <Tab label="Thống kê" value={ETabsUser.STATISTIC} />
                  <Tab label="Thông tin cá nhân" value={ETabsUser.INFO} />
                </TabList>
              </Box>
              <TabPanel value={ETabsUser.STATISTIC}>
                <Statistic statistic={statistic} />
              </TabPanel>
              <TabPanel value={ETabsUser.INFO}>
                <Info info={info} />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
};

export default User;

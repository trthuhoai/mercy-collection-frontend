import React, { useState } from 'react';
import Typo from 'components/Typo';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { IChildrenComment } from '../types';
import { convertDate, distanceDateFromNow } from 'untils';
import { FORMAT_DATE } from 'constant';
import Button from '@mui/material/Button';
import { useUser } from 'store';
import Tooltip from '@mui/material/Tooltip';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { routes } from 'constant/routes';

interface IProps {
  childrenComment: IChildrenComment[];
  onSubmitReply: (data) => void;
}

const Reply = ({ childrenComment, onSubmitReply }: IProps) => {
  const [valueReply, setValueReply] = useState<string>('');
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  return (
    <>
      {!!childrenComment.length && (
        <List
          sx={{
            borderRadius: '10px',
            width: '100%',
            bgcolor: 'common.white',
            padding: 0,
          }}
        >
          {childrenComment.map((children, index) => (
            <div key={children.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={children.picture || '/avartar.png'}
                      alt="Ảnh đại diện"
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    width: 'fit-content',
                    whiteSpace: 'pre-line',
                    '& > p': {
                      wordBreak: 'break-word',
                    },
                  }}
                  primary={
                    <Tooltip
                      placement="right"
                      title={convertDate(
                        new Date(children.date),
                        FORMAT_DATE.COMMENT,
                      )}
                    >
                      <div className="sm:flex gap-2 w-fit">
                        <Typo
                          className="text-black cursor-pointer"
                          isBold
                          onClick={() =>
                            navigate(
                              generatePath(routes.USER, {
                                id: children.memberId,
                              }),
                            )
                          }
                        >
                          {children.name}
                        </Typo>

                        {/* {convertDate(
                          new Date(children.date),
                          FORMAT_DATE.COMMENT,
                        )} */}
                        {distanceDateFromNow(children.date)}
                      </div>
                    </Tooltip>
                  }
                  secondary={children.content}
                />
              </ListItem>
              {index + 1 !== childrenComment.length && (
                <Divider variant="inset" component="li" />
              )}
            </div>
          ))}
        </List>
      )}
      {isAuthenticated && (
        <div className="flex gap-4 items-center px-4 mt-4">
          <TextField
            fullWidth
            label="Nhập phản hồi"
            id="outlined-size-small"
            multiline
            size="small"
            value={valueReply}
            onChange={e => setValueReply(e.target.value)}
          />
          <Button
            onClick={() => {
              onSubmitReply(valueReply);
              setValueReply('');
            }}
            variant="contained"
          >
            Gửi
          </Button>
        </div>
      )}
    </>
  );
};

export default Reply;

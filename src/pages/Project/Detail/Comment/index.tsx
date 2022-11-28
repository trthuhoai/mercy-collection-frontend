import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ICommentList, IFormComment } from '../types';
import { schemaComment } from '../constant';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from 'store';
import { useParams } from 'react-router-dom';
import { createComment, createReply, getListComment } from 'apis/comment';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { convertDate } from 'untils';
import { FORMAT_DATE } from 'constant';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Reply from './reply';

const Comment = () => {
  const { isAuthenticated } = useUser();
  const { id } = useParams();
  const [listComment, setListComment] = useState<ICommentList[]>([]);

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getListComment(id);
        setListComment(data);
      }
    })();
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormComment>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaComment),
  });

  const onSubmitReply = async (rootId, data) => {
    try {
      await createReply(id, rootId, data);
      const list = await getListComment(id);
      setListComment(list);
    } catch (error) {
      toast.success('Bình luận thất bại');
    }
  };

  const onSubmit = async data => {
    try {
      await createComment(id, data.comment);
      const list = await getListComment(id);
      setListComment(list);
      reset();
    } catch (error) {
      toast.success('Bình luận thất bại');
    }
  };

  return (
    <div className="my-4">
      <Typo size="large" isBold>
        Bình luận:
      </Typo>
      {isAuthenticated && (
        <div className="mt-8">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              label="Nhập bình luận"
              multiline
              rows={4}
              maxRows={4}
              {...register('comment')}
              error={!!errors.comment}
              helperText={errors.comment?.message}
            />
            <div className="mt-4 text-right">
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                variant="contained"
              >
                Gửi
              </LoadingButton>
            </div>
          </Box>
        </div>
      )}
      <div className="w-full mt-4">
        {listComment.length ? (
          <List
            sx={{
              borderRadius: '10px',
              width: '100%',
              bgcolor: 'common.white',
            }}
          >
            {listComment.map((comment, index) => (
              <div key={comment.id}>
                <ListItem>
                  <ListItemAvatar
                    sx={{
                      alignSelf: 'self-start',
                    }}
                  >
                    <Avatar>
                      <img
                        src={comment.picture || '/avartar.png'}
                        alt="Ảnh đại diện"
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      whiteSpace: 'pre-line',
                    }}
                    primary={
                      <div className="flex gap-2">
                        {comment.name}
                        <Typo>
                          {convertDate(
                            new Date(comment.date),
                            FORMAT_DATE.COMMENT,
                          )}
                        </Typo>
                      </div>
                    }
                    secondary={
                      <>
                        <div className="mb-2">{comment.content}</div>
                        <Accordion
                          key={index}
                          sx={{
                            boxShadow: 'none',
                            margin: '0 !important',
                            '&::before': {
                              height: 0,
                            },
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                              minHeight: '0 !important',
                              '& > .MuiAccordionSummary-content': {
                                margin: '0 !important',
                              },
                            }}
                          >
                            <Typography
                              component={'span'}
                              sx={{
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                              }}
                            >
                              Phản hồi
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              padding: '8px 0 0',
                            }}
                          >
                            <Reply
                              childrenComment={comment.childrenComment}
                              onSubmitReply={data =>
                                onSubmitReply(comment.id, data)
                              }
                            />
                          </AccordionDetails>
                        </Accordion>
                      </>
                    }
                  />
                </ListItem>
                {index + 1 !== listComment.length && (
                  <Divider variant="inset" component="li" />
                )}
              </div>
            ))}
          </List>
        ) : (
          <Typo>Không có bình luận nào</Typo>
        )}
      </div>
    </div>
  );
};

export default Comment;

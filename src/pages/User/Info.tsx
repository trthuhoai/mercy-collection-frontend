import React, { useEffect, useState } from 'react';
import Typo from 'components/Typo';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Stack from '@mui/material/Stack';
import { IUserInfo } from './types';
import { deepOrange, lightBlue } from '@mui/material/colors';

interface IProps {
  info: IUserInfo;
}

const Info = ({ info }: IProps) => {
  return (
    <div className="my-10 container">
      <div className="mx-auto rounded-md">
        <div className="my-4 ">
          Tên: {info.nameShow ? info.name : 'Đã được ẩn'}
        </div>
        <div className="my-4">
          Giới tính: {info.genderShow ? info.gender : 'Đã được ẩn'}
        </div>
        <div className="my-4">
          Địa chỉ: {info.addressShow ? info.address : 'Đã được ẩn'}
        </div>
        <div className="my-4">
          Ngày sinh: {info.birthdayShow ? info.birthday : 'Đã được ẩn'}
        </div>
        <div className="my-4">
          Số điện thoại: {info.telShow ? info.tel : 'Đã được ẩn'}
        </div>
      </div>
    </div>
  );
};

export default Info;

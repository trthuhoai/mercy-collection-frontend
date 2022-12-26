import React, { useEffect, useState } from 'react';
import { IUserInfo } from './types';

interface IProps {
  info: IUserInfo;
}

const Info = ({ info }: IProps) => {
  return (
    <div className="my-10 container">
      <div className="flex flex-1  items-center py-2 mx-0 lg:mx-96  border border-gray-300 bg-white rounded-lg">
        {/* <div className="mx-auto rounded-md">
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
        </div> */}
        <table className="table-fixed my-4 tracking-widest mx-auto">
          <tbody>
            <tr>
              <th>Họ và tên: </th>
              <td>{info.nameShow ? info.name : 'Đã được ẩn'}</td>
            </tr>
            <tr>
              <th>Giới tính: </th>
              <td>{info.genderShow ? info.gender : 'Đã được ẩn'}</td>
            </tr>
            <tr>
              <th>Địa chỉ: </th>
              <td>{info.addressShow ? info.address : 'Đã được ẩn'}</td>
            </tr>
            <tr>
              <th>Ngày sinh: </th>
              <td>{info.birthdayShow ? info.birthday : 'Đã được ẩn'}</td>
            </tr>
            <tr>
              <th>Số điện thoại: </th>
              <td>{info.telShow ? info.tel : 'Đã được ẩn'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Info;

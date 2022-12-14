export enum ELocalStorageKey {
  ACCESS_TOKEN = 'access_token',
  LOGIN_TYPE = 'login_type',
}

export enum ELoginType {
  USER = 'user',
  GOOGLE = 'google',
}

export enum ECategoryProject {
  CHILDREN = 'Trẻ em',
  EDUCATION = 'Giáo dục',
  MEDICAL = 'Y tế',
  CALAMITY = 'Thiên tai',
  ENVIRONMENT = 'Môi trường',
}

export enum EStatusProject {
  PENDING='Chờ phê duyệt',
  ACTIVE = 'Đang mở đơn',
  CANCELLED = 'Đã bị huỷ',
  EXPIRED = 'Hết hạn',
  ENDED = 'Đã kết thúc',
}

export enum ERoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum EGender {
  FEMALE = 'female',
  MALE = 'male',
  OTHER = 'USER',
}

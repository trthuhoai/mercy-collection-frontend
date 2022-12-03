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
  ACTIVE = 'Đang mở đơn đăng ký',
  CANCELLED = 'Đã bị huỷ',
  EXPIRED = 'Hết hạn đăng ký',
  ENDED = 'Đã kết thúc',
}

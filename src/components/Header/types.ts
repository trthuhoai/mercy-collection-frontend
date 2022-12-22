interface IFormRegisterProps {
  name: string;
  email: string;
  tel: string;
  password: string;
  repassword: string;
  gender: string;
}

interface IFormLoginProps {
  email: string;
  password: string;
}

interface IFormResionProps {
  reasion: string;
}

interface IFormResetPasswordProps {
  email: string;
}

interface IFormNewPasswordProps {
  password: string;
  repassword: string;
}

export type {
  IFormRegisterProps,
  IFormLoginProps,
  IFormResionProps,
  IFormResetPasswordProps,
  IFormNewPasswordProps,
};

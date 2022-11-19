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

export type { IFormRegisterProps, IFormLoginProps };

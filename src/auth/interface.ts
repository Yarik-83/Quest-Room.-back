

export interface IAuthCreateUser {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface ISignAuth {
      password: string;
      email: string
}

export interface IOtpSend {
  phone: string;
}
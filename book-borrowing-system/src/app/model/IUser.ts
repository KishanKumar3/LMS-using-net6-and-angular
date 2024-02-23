export interface UserForRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserForLogin {
    email: string;
    password: string;
    token: string;
}

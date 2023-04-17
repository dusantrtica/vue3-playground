export interface NewUser {
    username: string
    password: string
}

export interface User extends NewUser {
    id: string,
    username: string,
    password: string
}

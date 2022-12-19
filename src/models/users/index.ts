

export interface User {
    uid: string,
    email: string | null,
    displayName: string | null,
}

export interface SignUpUser {
    email: string | null,
    displayName: string | null,
    password: string,
    confirmPassword: string
}
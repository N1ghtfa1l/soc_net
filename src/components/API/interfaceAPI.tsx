export interface UserData {
    email: string,
    name: string,
    id: number,
    description: string
}

export interface regResponse {
    email: string,
    name: string,
    id: any
}
export interface ErrorResponse {
    message: string;
    code?: number;
    detail?: string
}
export interface PostsData {
    id: number,
    name: string,
    description: string,
    user_id: number
}

export interface MessageData {
    id: number,
    message: string,
    user: string
}
export interface ResponseContainer<R> {
    status: string;
    data?: R;
    message?: string;
};
import axios, { isAxiosError } from "axios"
import { ErrorResponse, PostsData, regResponse, UserData } from "./interfaceAPI"

export async function requestPost(url: string, userData?: any): Promise<regResponse | ErrorResponse> {
    try {
        const response = await axios.post(`http://127.0.0.1:8000${url}`, userData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (e) {
        if (isAxiosError(e)) {
            return {
                message: e.message,
                code: e.response?.status,
            };
        }
        return {
            message: 'Unknown error occurred',
        };
    }
}

export async function requestGet(url: string): Promise<regResponse | ErrorResponse | PostsData[] | UserData[]> {
    try {
        const response = await axios.get(`http://127.0.0.1:8000${url}`, { withCredentials: true })
        return response.data
    } catch (e) {
        if (isAxiosError(e)) {
            return {
                message: e.message,
                code: e.response?.status,
            };
        }
        return {
            message: 'Unknown error occurred',
        };
    }
}
import { jwtDecode } from "jwt-decode";

// what we expect to find inside the token
interface CustomJwtPayload {
    // username
    sub: string;
    // role claim
    role?: string;
    exp: number;
}

export const getUserRole = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        // returns the role/null if it does not exists
        return decoded.role || null;
    } catch (error) {
        return null;
    }
};
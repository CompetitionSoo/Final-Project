const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        created_at: string;
    };
}

export interface AuthError {
    error: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }
    
    // Store the token in localStorage
    localStorage.setItem('token', data.token);
    return data;
};

export const register = async (email: string, password: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
    }
    
    return data;
};

export const logout = (): void => {
    localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
}; 
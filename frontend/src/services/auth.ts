const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//여기가 프론트앤드<<>>백엔드 인증관련 통신하는 typescript파일
export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        username: string;
        email: string;
        phone: string;
    };
}

export interface AuthError {
    error: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
      throw new Error(data.error || 'Login failed');
  }
  
  // Store the token in localStorage
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async ({
    name,
    username,
    email,
    phone,
    password
  }: {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, phone, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }
  
    return data;
  };
  

export const logout = (): void => {
    localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
}; 
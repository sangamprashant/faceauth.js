import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type AuthContextType = {
    token: {
        setAuthToken: (token: string) => void;
        authToken: string;
    };
    userData: {
        setUser: (user: any) => void;
        user: any;
    };
    authenticate: {
        setIsAuthenticated: (value: boolean) => void;
        isAuthenticated: boolean;
    };
    loading: boolean;
    checkAuth: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState("");
    const [user, setUser] = useState<any>(null);

    const checkAuth = async () => {
        setLoading(true);
        // Replace this with your actual authentication check logic
        setTimeout(() => {
            const userIsAuthenticated = true; // Replace with actual logic
            setIsAuthenticated(userIsAuthenticated);
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = () => {
        // Clear token, user data, and set isAuthenticated to false
        setAuthToken("");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            token: { setAuthToken, authToken },
            userData: { setUser, user },
            authenticate: { setIsAuthenticated, isAuthenticated },
            loading,
            checkAuth,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

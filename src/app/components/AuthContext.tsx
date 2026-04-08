import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  community: string;
  role: string;
  certLevel: string;
  joinDate: string;
  avatar: string;
  bio: string;
  unreadNotifications: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInfo | null;
  login: (name?: string, phone?: string, community?: string) => void;
  logout: () => void;
}

const defaultUser: UserInfo = {
  name: "李明",
  phone: "138****8888",
  email: "liming@example.com",
  community: "阳光花园社区",
  role: "注册志愿者",
  certLevel: "中级急救员",
  joinDate: "2025-06-15",
  avatar: "李",
  bio: "热心社区急救事业，致力于普及急救知识",
  unreadNotifications: 2,
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem("community_aid_logged_in") === "true";
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState<UserInfo | null>(() => {
    try {
      const saved = localStorage.getItem("community_aid_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("community_aid_logged_in", String(isLoggedIn));
      if (user) {
        localStorage.setItem("community_aid_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("community_aid_user");
      }
    } catch {}
  }, [isLoggedIn, user]);

  const login = (name?: string, phone?: string, community?: string) => {
    const u: UserInfo = {
      ...defaultUser,
      name: name || defaultUser.name,
      phone: phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : defaultUser.phone,
      community: community || defaultUser.community,
      avatar: (name || defaultUser.name).charAt(0),
    };
    setUser(u);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

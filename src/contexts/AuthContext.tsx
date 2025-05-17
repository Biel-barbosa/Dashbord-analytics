
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginAsDemo: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários de demonstração para autenticação simulada
let DEMO_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@exemplo.com",
    password: "password123",
    role: "admin",
  },
  {
    id: "2",
    name: "Usuário Demo",
    email: "demo@exemplo.com",
    password: "demo123",
    role: "user",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se o usuário está armazenado no localStorage (simulando sessão persistente)
    const storedUser = localStorage.getItem("dashboardUser");
    const storedUsers = localStorage.getItem("dashboardUsers");
    
    if (storedUsers) {
      // Carregar usuários do localStorage
      DEMO_USERS = JSON.parse(storedUsers);
    } else {
      // Se não houver usuários armazenados, salvar os iniciais
      localStorage.setItem("dashboardUsers", JSON.stringify(DEMO_USERS));
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular atraso de API
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Obter a lista mais recente de usuários
    const storedUsers = localStorage.getItem("dashboardUsers");
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : DEMO_USERS;
    
    const foundUser = currentUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("dashboardUser", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo(a) de volta, ${userWithoutPassword.name}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Falha no login",
        description: "Email ou senha inválidos",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const loginAsDemo = () => {
    const demoUser = {
      id: "999",
      name: "Usuário Visitante",
      email: "visitante@exemplo.com",
      role: "visitor",
    };
    
    setUser(demoUser);
    localStorage.setItem("dashboardUser", JSON.stringify(demoUser));
    toast({
      title: "Modo visitante ativado",
      description: `Bem-vindo(a), Usuário Visitante!`,
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simular atraso de API
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Obter a lista mais recente de usuários
    const storedUsers = localStorage.getItem("dashboardUsers");
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : DEMO_USERS;
    
    const userExists = currentUsers.some((u: any) => u.email === email);

    if (userExists) {
      toast({
        title: "Falha no registro",
        description: "Este email já está em uso",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }

    // Criar um novo usuário e adicionar à lista
    const newUser = {
      id: `${currentUsers.length + 1}`,
      name,
      email,
      password,
      role: "user",
    };

    const updatedUsers = [...currentUsers, newUser];
    localStorage.setItem("dashboardUsers", JSON.stringify(updatedUsers));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("dashboardUser", JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Registro bem-sucedido",
      description: `Bem-vindo(a), ${name}!`,
    });
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dashboardUser");
    toast({
      title: "Sessão encerrada",
      description: "Você saiu com sucesso",
    });
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("dashboardUser", JSON.stringify(updatedUser));
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loginAsDemo,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

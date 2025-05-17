
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const { isAuthenticated, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate("/dashboard");
    toast({
      title: "Modo demonstração ativado",
      description: "Bem-vindo ao Dashboard Analítico!"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-xl overflow-hidden">
        {/* Lado esquerdo - Conteúdo promocional */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none">
            <div className="absolute transform rotate-12 -bottom-10 -left-20 w-40 h-64 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-xl opacity-40"></div>
            <div className="absolute transform -rotate-12 -bottom-20 left-40 w-72 h-64 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur-xl opacity-30"></div>
            <div className="absolute transform rotate-45 -bottom-10 right-10 w-60 h-60 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-30"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dashboard Analítico</h1>
            <p className="text-xl opacity-90 mb-8 max-w-md">
              Transforme seus dados em insights valiosos com nosso painel de visualização analítica profissional.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="h-5 w-5 mr-3 rounded-full bg-white/20 flex items-center justify-center text-white">✓</span>
                <span>Visualizações interativas e personalizáveis</span>
              </li>
              <li className="flex items-center">
                <span className="h-5 w-5 mr-3 rounded-full bg-white/20 flex items-center justify-center text-white">✓</span>
                <span>Análise de dados em tempo real</span>
              </li>
              <li className="flex items-center">
                <span className="h-5 w-5 mr-3 rounded-full bg-white/20 flex items-center justify-center text-white">✓</span>
                <span>Painel responsivo para todos os dispositivos</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Lado direito - Login */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo(a) ao sistema</h2>
            <p className="text-gray-600">Faça login para acessar seu painel</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/login")}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Fazer login
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDemoAccess}
              className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Acessar demonstração
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">Não tem uma conta? </span>
              <button 
                onClick={() => navigate("/register")}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-brand-600">404</h1>
        <h2 className="text-3xl font-semibold mb-6 mt-2">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          size="lg"
        >
          Go {isAuthenticated ? "to Dashboard" : "Home"}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

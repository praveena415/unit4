import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  let navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentUser, navigate]);

  return children;
}

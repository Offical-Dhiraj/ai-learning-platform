import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import FloatingAIButton from "../components/FloatingAIButton";

export default function App() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  const showChat =
    token && !["/login", "/register"].includes(location.pathname);

  return (
    <>
      <AppRoutes />
      {showChat && <FloatingAIButton />}
    </>
  );
}

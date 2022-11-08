import { useContext } from "react";
import { AuthContext } from "src/contexts/jwt-context";

const useAuth = () => useContext(AuthContext);

export default useAuth;

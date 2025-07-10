import useAutoLogin from "./features/auth/useAutoLogin";
import AppRouter from "./router/AppRouter";
import addTestUser from "./services/addTestUser";

export default function App() {
  useAutoLogin();
  useEffect(() => {
    addTestUser();
  }, []);
  return <AppRouter />;
}

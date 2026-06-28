import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { publicRoutes, protectedRoutes } from "./routes";
import { PublicRoute } from "./components/PublicRoutes";
import "./styles/App.css";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserInfo } from "./hooks/useUserInfo";

function App() {
  const { isAuthenticated } = useUserInfo();
  const queryClient = useMemo(() => new QueryClient(), []);

  const redirectPath = "/dashboard";
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={redirectPath} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {publicRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <PublicRoute
                  element={element}
                  path={path}
                  isAuthenticated={isAuthenticated}
                  redirectPath={redirectPath}
                />
              }
            />
          ))}

          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                isAuthenticated ? element : <Navigate to="/login" replace />
              }
            />
          ))}

          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to={redirectPath} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

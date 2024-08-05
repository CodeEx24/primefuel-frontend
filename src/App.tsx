import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Auth/Login';
import AuthLayout from './shared/layouts/Auth';
import AdminLayout from './shared/layouts/Admin';
import { adminRoutes } from './shared/routes/adminLinks';
import ProtectedAuthRoutes from './components/ProtectAuthRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <ProtectedAuthRoutes>
              <AuthLayout />
            </ProtectedAuthRoutes>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="" element={<LoginPage />} />
        </Route>
        {adminRoutes.map((parentRoute) => {
          return (
            <Route
              key={parentRoute.path}
              path={parentRoute.path}
              element={parentRoute.element}
            >
              {parentRoute.children &&
                parentRoute.children.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
            </Route>
          );
        })}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

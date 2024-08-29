import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Auth/Login';
import AuthLayout from './shared/layouts/Auth';
import { superAdminRoutes } from './shared/routes/superAdminLinks';
import ProtectedAuthRoutes from './components/ProtectAuthRoutes';
import { DefaultPage } from './pages/Auth/Default';
import { ROUTES } from './shared/constants/ROUTES';
import { adminRoutes } from './shared/routes/adminLinks';
import { ownerRoutes } from './shared/routes/ownerLinks';
import { staffRoutes } from './shared/routes/staffLinks';
import { driverRoutes } from './shared/routes/driverLinks';

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
          <Route path="" element={<DefaultPage />} />
          <Route path={`${ROUTES.ADMIN.PATH}`} element={<LoginPage />} />
          <Route path={`${ROUTES.SUPER_ADMIN.PATH}`} element={<LoginPage />} />
          <Route path={`${ROUTES.OWNER.PATH}`} element={<LoginPage />} />
          <Route path={`${ROUTES.STAFF.PATH}`} element={<LoginPage />} />
          <Route path={`${ROUTES.DRIVER.PATH}`} element={<LoginPage />} />
        </Route>

        {superAdminRoutes.map((parentRoute) => {
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

        {ownerRoutes.map((parentRoute) => {
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

        {staffRoutes.map((parentRoute) => {
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

        {driverRoutes.map((parentRoute) => {
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
      </Routes>
    </Router>
  );
}

export default App;

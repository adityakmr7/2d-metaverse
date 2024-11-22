import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import Auth from "@/screens/Auth";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";
import Spaces from "@/screens/Admin/Spaces.tsx";
import Elements from "@/screens/Admin/Elemements.tsx";
import Maps from "@/screens/Admin/Maps.tsx";
import AdminDashboard from "@/screens/Admin/AdminDashboard";
import Space from "@/screens/User/Space";
import Dashboard from "@/screens/User/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/space/:spaceId"
            element={
              <PrivateRoute>
                <Space />
              </PrivateRoute>
            }
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/spaces" element={<Spaces />} />
          <Route path="/admin/elements" element={<Elements />} />
          <Route path="/admin/maps" element={<Maps />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

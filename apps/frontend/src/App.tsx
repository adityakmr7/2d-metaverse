import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import Dashboard from "@/screens/Dashboard";
import Auth from "@/screens/Auth";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";
import Space from "@/screens/Space";

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
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

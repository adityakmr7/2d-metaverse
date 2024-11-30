import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";
import AuthScreen from "@/screens/AuthScreen";
import Dashboard from "@/screens/Dashboard";
import SpaceView from "@/screens/SpaceView/SpaceView.tsx";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import PrivateRoute from "@/components/PrivateRoute.tsx";

function App() {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* public route*/}
            <Route path="/auth" element={<AuthScreen />} />
            {/*public route*/}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/space-view/:spaceId" element={<SpaceView />} />
            </Route>
            {/* Redirect to dashboard if accessing root */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Catch all route - 404 Not Found */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  );
}

export default App;

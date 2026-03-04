import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import WeatherPlusApp from "./pages/WeatherPlusApp/WeatherPlusApp.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import WeekForecast from "./pages/WeekForecast.jsx";
import MapPage from "./pages/MapPage.jsx";
import HourlyForecast from "./pages/WeatherPlusApp/HourlyForecast.jsx";
import Blog from "./pages/Blog.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <WeatherPlusApp />
      </Layout>
    ),
  },
  {
    path: "signup",
    element: (
      <Layout>
        <SignUpForm />
      </Layout>
    ),
  },
  {
    path: "login",
    element: (
      <Layout>
        <LoginForm />
      </Layout>
    ),
  },
  {
    path: "weatherPlusApp",
    element: (
      <Layout>
        <ProtectedRoute>
          <WeatherPlusApp />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "weekForecast/:city?",
    element: (
      <Layout>
        <ProtectedRoute>
          <WeekForecast />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "map",
    element: (
      <Layout>
        <ProtectedRoute>
          <MapPage />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "hourly/:city?",
    element: (
      <Layout>
        <ProtectedRoute>
          <HourlyForecast />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "blog",
    element: (
      <Layout>
        <Blog />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

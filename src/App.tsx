import { BrowserRouter, Route, Routes } from "react-router-dom";
import PointcloudCollision from "./pages/pointcloud-collision";
import Index from "./pages";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pcc" element={<PointcloudCollision />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" />
    </ThemeProvider>
  );
};

export default App;
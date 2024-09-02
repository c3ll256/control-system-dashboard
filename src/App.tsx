import { BrowserRouter, Route, Routes } from "react-router-dom";
import PointcloudCollision from "./pages/pointcloud-collision";
import Index from "./pages";
import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pcc" element={<PointcloudCollision />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
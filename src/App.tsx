import { BrowserRouter, Route, Routes } from "react-router-dom";
import PointcloudCollision from "./pages/pointcloud-collision";
import Index from "./pages";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/" element={<PointcloudCollision />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
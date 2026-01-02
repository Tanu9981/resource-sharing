import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Browse from "./Components/Browse";
import ResourceDetail from "./Components/ResourceDetail";
import Upload from "./Components/Upload";
import UploadSuccess from "./Components/UploadSuccess";
import Admin from "./Components/Admin";
import Landing from "./Components/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing & Main Pages */}
        <Route path="/" element={<Landing />} />

        {/* Individual Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={<Browse />} />

        {/* Resource Detail with dynamic id */}
        <Route path="/resource/:id" element={<ResourceDetail />} />

        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-success" element={<UploadSuccess />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

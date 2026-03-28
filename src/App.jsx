import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import CreateCV from "./pages/CreateCV";
import PreviewCV from "./pages/PreviewCV";

export default function App() {
  const [page, setPage] = useState("landing");
  const [cvData, setCvData] = useState(null);

  return (
    <div>
      {page === "landing" && <LandingPage onStart={() => setPage("create")} />}
      {page === "create" && (
        <CreateCV
          onBack={() => setPage("landing")}
          onGenerate={(data) => {
            setCvData(data);
            setPage("preview");
          }}
        />
      )}
      {page === "preview" && (
        <PreviewCV
          cvData={cvData}
          onBack={() => setPage("create")}
          onRestart={() => setPage("landing")}
        />
      )}
    </div>
  );
}

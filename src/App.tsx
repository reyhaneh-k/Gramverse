import "./assets/styles/App.css";
import { AppRoutes, AppRoutesMobile } from "./app-routes";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "./common/query-client";

function App() {
  const [mobile, setMobile] = useState(
    window.matchMedia("(max-width:375px)").matches,
  );
  window.addEventListener("resize", () => {
    setMobile(window.matchMedia("(max-width:375px)").matches);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div
        lang="fa"
        className="flex h-screen grow items-center justify-center bg-primary"
      >
        {mobile && <AppRoutesMobile></AppRoutesMobile>}
        {!mobile && <AppRoutes></AppRoutes>}
      </div>
    </QueryClientProvider>
  );
}

export default App;

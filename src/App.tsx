// C:\Users\lenovo\OneDrive\Bobby\Projects\blind-code-blitz-main\src\App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Registration from "./pages/Registration";
import PoolSelection from "./pages/PoolSelection";
import Contest from "./pages/Contest";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import DemoContest from "./pages/DemoContest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/pool-selection" element={<PoolSelection />} />
          <Route path="/demo" element={<DemoContest />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import AuthPage from "./pages/AuthPage";
import InviteAcceptPage from "./pages/InviteAcceptPage";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors expand={true} position="top-center" />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:id" element={<BoardPage />} />
          <Route path="/invite/:token" element={<InviteAcceptPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

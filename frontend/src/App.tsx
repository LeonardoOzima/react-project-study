import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
import Home from "./Screens/Home/Home";
import About from "./Screens/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // adicione uma tela aqui
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

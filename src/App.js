import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./components/AppLayout";
import Feedbacks from "./pages/Feedbacks";
import AddFeedback from "./pages/AddFeedback";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import FeedbackDetails from "./pages/FeedbackDetails";
import EditFeedback from "./pages/EditFeedback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="feedbacks" />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="/feedback/new" element={<AddFeedback />} />
              <Route
                path="/feedback/:id/comments"
                element={<FeedbackDetails />}
              />
              <Route path="/feedback/:id/edit" element={<EditFeedback />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;

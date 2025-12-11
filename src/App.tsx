import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Learner Pages
import LearnerLayout from "./components/learner/LearnerLayout";
import Dashboard from "./pages/learner/Dashboard";
import Courses from "./pages/learner/Courses";
import CourseDetail from "./pages/learner/CourseDetail";
import CoursePlayer from "./pages/learner/CoursePlayer";
import Practice from "./pages/learner/Practice";
import CodingEnvironment from "./pages/learner/CodingEnvironment";
import Projects from "./pages/learner/Projects";
import Psychometric from "./pages/learner/Psychometric";
import Certificates from "./pages/learner/Certificates";
import Profile from "./pages/learner/Profile";
import Exams from "./pages/learner/Exams";
import ExamAttempt from "./pages/learner/ExamAttempt";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Learner Routes */}
            <Route path="/dashboard" element={<LearnerLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="courses/:courseId/learn" element={<CoursePlayer />} />
              <Route path="practice" element={<Practice />} />
              <Route path="practice/:problemId" element={<CodingEnvironment />} />
              <Route path="projects" element={<Projects />} />
              <Route path="psychometric" element={<Psychometric />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="profile" element={<Profile />} />
              <Route path="exams" element={<Exams />} />
              <Route path="exams/attempt" element={<ExamAttempt />} />
              <Route path="exams/results" element={<Exams />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="students" element={<AdminStudents />} />
              <Route path="courses" element={<AdminStudents />} />
              <Route path="questions" element={<AdminStudents />} />
              <Route path="exams" element={<AdminStudents />} />
              <Route path="analytics" element={<AdminStudents />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { Pricing } from './pages/Pricing';
import JobseekerRoute from './utils/JobseekerRoute';
import { PageNotFound } from './pages/PageNotFound';
import { AuthProvider } from './context/AuthContext';
import { NewEmail } from './pages/Authentication/NewEmail';
import { ResetEmail } from './pages/Authentication/ResetEmail';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { Profile } from './JobSeekers/pages/JobseekerViewProfile';
import { JobseekersHome } from './JobSeekers/pages/JobseekersHome';
import { ResetPassword } from './pages/Authentication/ResetPassword';
import { ForgotPassword } from './pages/Authentication/ForgotPassword';
import { JobseekerProfile } from './JobSeekers/pages/JobseekerProfile';
import { ActivateAccount } from './pages/Authentication/ActivateAccount';
import { VerifyAccountUI } from './pages/Authentication/VerifyAccountUI';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JobseekerDashboard } from './JobSeekers/pages/JobseekerDashboard';
import { JobApplication } from './JobSeekers/JobApplication/JobApplication';
import { JobseekerLoginFormUI } from './JobSeekers/pages/JobseekerLoginFormUI';
import { JobseekerRegisterFormUI } from './JobSeekers/pages/JobseekerRegisterFormUI';

// employers import
import { EmployersHome } from './Employers/pages/EmployersHome';
import { EmployersLoginFormUI } from './Employers/pages/EmployersLoginFormUI';


//loader css
import { EditJob } from './Employers/Jobs/EditJob';
import EmployerRoute from './utils/EmployerRoute';
import { ResetLink } from './pages/Authentication/ResendLink';
import { EmployerPostJob } from './Employers/PostJob/EmployerPostJob';
import { EmployerViewJobs } from './Employers/pages/EmployerViewJobs';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { EmployersDashboard } from './Employers/pages/EmployersDashboard';
import { EmployersRegistration } from './Employers/pages/EmployersRegistration';


function App() {
  return (
    <Router>

      <div className="w-full mx-auto">
        <AuthProvider>
          <Routes>
            <Route path="/" exact element={<JobseekersHome />} />
            <Route element={<JobseekerRoute />}>
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/profile/edit" element={<JobseekerProfile />} />
              <Route path="/dashboard/find-jobs" element={<JobseekerDashboard />} />
              <Route path="/dashboard/apply/job/:id" element={<JobApplication />} />
            </Route>


            {/* employers */}
            <Route element={<EmployerRoute />}>
              <Route path="/employer/dashboard/" element={<EmployersDashboard />} />
              <Route path="/employer/dashboard/post-job" element={<EmployerPostJob />} />
              <Route path="/employer/dashboard/view-jobs" element={<EmployerViewJobs />} />
              <Route path="/employer/dashboard/edit-job/:id" element={<EditJob />} />
            </Route>

            <Route path="/jobseeker/login" element={<JobseekerLoginFormUI />} />
            <Route path="/jobseeker/register" element={<JobseekerRegisterFormUI />} />
            <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
            <Route path="/verify" element={<VerifyAccountUI />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
            <Route path="/reset-email" element={<ResetEmail />} />
            <Route path="/email/reset/confirm/:uid/:token" element={<NewEmail />} />
            <Route path="resend-link" element={<ResetLink />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<PageNotFound />} />

            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/employer" element={<EmployersHome />} />
            <Route path="/employer/register" element={<EmployersRegistration />} />
            <Route path="/employer/login" element={<EmployersLoginFormUI />} />

          </Routes>
        </AuthProvider>


      </div>
    </Router>

  );
}

export default App;

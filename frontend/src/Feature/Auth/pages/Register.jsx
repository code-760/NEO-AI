import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useauth } from '../hook/userAuth';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router';


const Register = () => {


  // states
 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });


  // HOOks
  const {user,loading}=useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const {hendaregistar}=useauth()




// functions:-

  // get input value
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


 // registar api call
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await hendaregistar({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
     
      setTimeout(() => {
        navigate("/login");
      }, 1500);
  
      // Success toast yaha mat lagana
      // Kyuki hendaregistar me already hai
    } catch (error) {
      console.log(error);
    }
  };

// If user is already register in and loading is complete,
  // redirect to the dashboard/home page.
  if(!loading && user){
    return <Navigate to="/app" replace />
}



  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 transition-all duration-300">
        <div className="relative mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-indigo-500 shadow-sm">
            <img src="https://ik.imagekit.io/zo9aabuxd/neo_ai.webp" alt="Logo" className="h-full w-full object-cover" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h2>
          <p className="mt-2 text-sm text-slate-500">Join us today to get started with your account</p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600"
              htmlFor="register-username"
            >
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                id="register-username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pr-4 pl-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600"
              htmlFor="register-email"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                id="register-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pr-4 pl-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600"
              htmlFor="register-password"
            >
              Password
            </label>

            <div className="relative flex items-center">
              <Lock className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pr-11 pl-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-500 hover:text-slate-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-500 p-0.5 font-semibold text-white shadow-lg shadow-slate-300 transition-all duration-300 hover:bg-indigo-400 active:scale-[0.98] disabled:opacity-70"
          >
            <span className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-indigo-500 px-4 py-3.5 text-sm text-white transition-all duration-300">
              {loading ? (
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-slate-200 border-slate-600">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  Sign Up
                  <UserPlus className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                </>
              )}
            </span>
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/" className="font-semibold text-slate-900 transition-colors hover:text-slate-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, } from "lucide-react";
import { useauth } from "../hook/userAuth";
import { ToastContainer, toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Login = () => {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Hooks
  const { user, loading } = useSelector((state) => state.auth);
  const { hendallogin } = useauth();
  const navigate = useNavigate();





  // functions:-


  // get input value
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  // login api call
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await hendallogin({
        email: formData.email,
        password: formData.password,
      });
      navigate("/app");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in and loading is complete,
  // redirect to the dashboard/home page.
  if (!loading && user) {
    return <Navigate to="/app" replace />;
  }

  return (
    // Screen Center Alignment
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f2f3f7] p-4 text-gray-700 font-sans">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Outer Card - BeeBot Glassmorphism Theme */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/80 bg-[#f8f9fc]/80 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white">
        {/* Soft Background Gradient Glows */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-48 w-48 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl" />

        {/* Header with Logo */}
        <div className="relative mb-8 text-center">
          {/* Logo Container */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-indigo-600 shadow-md shadow-indigo-200">
            {/* Logo image or icon */}
            <img src="https://ik.imagekit.io/zo9aabuxd/neo_ai.webp" alt="Logo" className="h-16 w-16 object-contain " />
            {/* Fallback Bot Icon if image isn't loaded */}
            {/* <Bot className="h-7 w-7 text-white" /> */}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Welcome Back</h2>
          <p className="mt-1 text-xs text-gray-500">Access your account with your credentials</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-5">
          {/* Email Field */}
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500"
              htmlFor="login-email"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 h-4 w-4 text-gray-400" />
              <input
                id="login-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-white/80 py-3 pr-4 pl-11 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-sm transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor="login-password">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 h-4 w-4 text-gray-400" />
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white/80 py-3 pr-11 pl-11 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-sm transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 py-3 px-4 font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-300 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70 text-xs md:text-sm"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="mt-5 text-center text-sm text-slate-400">
            Don't have an account?
            <Link to="/register" className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

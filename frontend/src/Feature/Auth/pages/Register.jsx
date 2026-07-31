import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useauth } from '../hook/userAuth';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';


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
    return <Navigate to="/" replace />
}



  return (
    // Screen Center Alignment
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0C1327] p-4">
      <ToastContainer position="top-right" autoClose={3000} theme="colored"
      
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white/20">
        {/* Background Accent Glow */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Header with Logo */}
        <div className="relative mb-8 text-center">
          {/* Logo Container */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-800/80 shadow-inner shadow-indigo-500/10 backdrop-blur-md">
            <img src="/neo_ai.png" alt="Logo" className="h-full w-full object-cover" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
          <p className="mt-2 text-sm text-slate-400">Join us today to get started with your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-4">
          {/* Username Field */}
          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
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
                className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 py-3.5 pr-4 pl-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-slate-800/80 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
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
                className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 py-3.5 pr-4 pl-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-slate-800/80 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
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
                className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 py-3.5 pr-11 pl-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-slate-800/80 focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-200 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 active:scale-[0.98] disabled:opacity-70"
          >
            <span className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-slate-950/20 px-4 py-3.5 text-sm transition-all duration-300 group-hover:bg-transparent">
              {loading ? (
                
                <div
                  class="w-10 h-10 border-4 border-t-pink-500  border-gray-300 rounded-full animate-spin "
                >
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
        </form>
      </div>
    </div>
  );
};

export default Register;

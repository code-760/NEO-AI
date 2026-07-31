import { useDispatch } from "react-redux";
import { getme, login, register } from "../Services/app.servise";
import { setError, setLoading, setUser } from "../app.Slice";
import { toast } from "react-toastify";

export const useauth = () => {
  const dispatch = useDispatch();

  const hendaregistar = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));

      const response = await register({
        username,
        email,
        password,
      });

      // Success Toast
      toast.success(
        response?.data?.message ||
          "Registration successful! please check your email for verification mail to login",
      );

      return response;
    } catch (error) {
      let errorMsg = "Something went wrong";

      const data = error.response?.data;

      if (data?.errors) {
        const firstKey = Object.keys(data.errors)[0];
        errorMsg = data.errors[firstKey];
      } else if (data?.err) {
        errorMsg = data.err;
      } else if (data?.message) {
        errorMsg = data.message;
      }

      toast.error(errorMsg);

      dispatch(setError(errorMsg));

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const hendallogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));

      const response = await login({ email, password });

      console.log(response.data.user);

      dispatch(setUser(response.data.user));

      toast.success(response?.data?.message);
      return response;
    } catch (err) {
      let errorMsg = "Something went wrong";
      const data = err.response?.data;
      if (data?.errors) {
        const firstKey = Object.keys(data.errors)[0];
        errorMsg = data.errors[firstKey];
      } else if (data?.err) {
        errorMsg = data.err;
      } else if (data?.message) {
        errorMsg = data.message;
      }
      toast.error(errorMsg);
      dispatch(setError(errorMsg));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const hendalgetme = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getme();
      dispatch(setUser(response.data.user));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Registration failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    hendallogin,
    hendaregistar,
    hendalgetme,
  };
};

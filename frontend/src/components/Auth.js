import { useState } from "react";
import axiosConfig from "../axios/axiosConfig";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosConfig.post(
        `/users/auth`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setCookie("Email", response.data.email);
      setCookie("AuthToken", response.data.token);

      window.location.reload();
    } catch (error) {
      setError("Something Went Wrong");
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e)}
          />
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Auth;

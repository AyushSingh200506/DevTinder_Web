import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailID, setEmailId] = useState("satya@gmail.com");
  const [password, setPassword] = useState("Satya@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
        const res = await axios.post(BASE_URL + "/login", {
          emailID,
          password
        }, {
          withCredentials: true
        });
        console.log("Login successful:", res.data);
        dispatch(addUser(res.data));
        return navigate("/");
    } catch (err){
        setError(err.response?.data || "Something went wrong.");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Email ID:</legend>
              <input type="text" value={emailID} className="input" onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
             <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Password:</legend>
              <input type="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

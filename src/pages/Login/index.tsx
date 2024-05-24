import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import isEmpty from "lodash/isEmpty";
import { HashLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState<string>("reactdev@iniceptia.ai");
  const [password, setPassword] = useState<string>("4eSBbHqiCTPdBCTj");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token, isLoading } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(getUser({ email, password })).unwrap();
      setError(null);
    } catch (err: any) {
      setError(err.message || "Email y/o contraseña son incorrectos");
    }
  };

  useEffect(() => {
    if (!isEmpty(token)) {
      navigate("/reports");
    }
  }, [token, navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Inceptia AI</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <HashLoader color="#6b0505" />

            {/* <img src={Loading} alt="loading" height="100px" /> */}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">Email</label>
              <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="py-2 px-3 border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">Contraseña</label>
              <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-2 px-3 border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="mt-6 text-center">
              <button type="submit" className="underline">Ingresar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

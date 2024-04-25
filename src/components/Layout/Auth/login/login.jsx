import { useRouter } from "next/router";
import Link from 'next/link';


import React from "react";
import { Button } from "@/components/ui/button";

import { useMutation } from "react-query";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const loginUser = async (formData) => {
    const response = await axios.post(`https://wave-backend-zulg.onrender.com/admin-login`, formData, {
      headers: {
        'Content-Type': 'multipart/json'
      }
    });

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const {
    mutate: authMutation,
    isLoading,
    isError,
  } = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data !== undefined) {

        console.log("user logged in");
      }
    },
    onError: (error) => {
      console.error("Error editing profile:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authMutation(formData);
      router.push("/dashboard");

    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  return (
    <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-r from-rose-500 to-orange-500">
      <div className=" justify-center align-middle">
        <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="w-auto lg:w-96 grid">
          <label className="text-sm text-white ml-2">Email</label>
          <input
            name="email"
            onChange={(e) => handleChange(e)}
            className=" p-2 rounded-md m-2 outline-none"
          />
          <label className="text-sm text-white ml-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            className=" p-2 rounded-md m-2 outline-none"
          />
          <div className="text-left mb-4 ml-2 mt-5 ">
            <Button variant="default">Login</Button>
            <p className="text-sm font-semibold float-right text-white mt-2">
              Forget password? <Link href="/reset">
                Reset here
              </Link>
            </p>
          </div>
          <p className="text-white text-sm"></p>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Login);

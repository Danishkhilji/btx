import { useRouter } from "next/router";
import Link from 'next/link';
import axios from "axios";

import React from "react";
import { Button } from "@/components/ui/button";

import { useMutation } from "react-query";
import { useEffect } from "react";


const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user || token) {
      router.push('/dashboard');
    }
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Hardcoded email and password values for simulation
      const hardcodedEmail = "admin@gmail.com";
      const hardcodedPassword = "admin123";

      // Check if the entered email and password match the hardcoded values
      if (formData.email === hardcodedEmail && formData.password === hardcodedPassword) {
        const dummyUser = {
          id: 1,
          name: "admin",
          email: "admin@gmail.com",
        };
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmFiOWE4ZGMxYmJkNGVlNjdmYmE3NCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTcxNDE1MTA4NywiZXhwIjoxNzE0MTU0Njg3fQ.0E06twUsI_uNHK4yKPPJKYAdwjfl0zVVoP2Oj6qc46g"
        localStorage.setItem('user', JSON.stringify(dummyUser));
        localStorage.setItem('token', token);
        router.push("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(loginData)
  //     const response = await axios.post(`https://wave-backend-zulg.onrender.com/admin-login`, loginData, {
  //       headers: {
  //         'Content-Type': 'multipart/json'
  //       }
  //     });
  //     console.log(response)
  //     if (response.data.success) {
  //       localStorage.setItem('user', JSON.stringify(response.data.user));
  //       localStorage.setItem('token', JSON.stringify(response.data.user));
  //       router.push("/dashboard");

  //     }


  //   } catch (error) {
  //     console.error("Error editing profile:", error);
  //   }
  // };

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

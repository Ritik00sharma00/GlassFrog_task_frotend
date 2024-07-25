"use client"
import React, { useState } from 'react';
import Inputfield from "@/components/FormComponents/Inputfield";
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const router=useRouter();

  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    let payload = { username, email, password };
    setLoading(true);
    setErrorMsg(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "https://glassfrog-db.onrender.com/api/registration",
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("Response:", response);
      setSuccess("Registration successful!"); 
      router.push('/Signinform');
    } catch (error) {
      console.log("Error:", error);
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white md:p-20 p-0 flex flex-col items-center ">
      <h1 className='text-[#134B70] text-[24px] font-sans'>Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)} method="post" className="bg-white p-15 flex flex-col space-y-3 ">
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: 'Username is required' }}
          render={({ field }) => 
            <Inputfield
              {...field}
              label="Username"
              type="text"
              icon="👤"
              errors={errors.username}
            />
          }
        />
        {errors.username && <p className="text-red-500 text-[13px]">{errors.username.message}</p>}

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address'
            }
          }}
          render={({ field }) => 
            <Inputfield
              {...field}
              label="Email"
              type="email"
              icon="📧"
              errors={errors.email}
            />
          }
        />
        {errors.email && <p className="text-red-500 text-[13px]">{errors.email.message}</p>}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
          render={({ field }) => 
            <Inputfield
              {...field}
              label="Password"
              type="password"
              icon="🔒"
              errors={errors.password}
            />
          }
        />
        {errors.password && <p className="text-red-500 text-[13px]">{errors.password.message}</p>}

        {errorMsg && <p className="text-red-500 text-[13px]">{errorMsg}</p>}
        {success && <p className="text-green-500 text-[13px]">{success}</p>}

        <Link href="/Signinform" className="text-[#508C9B]">Already have an account?</Link>
        <button type='submit' className="bg-blue-500 lg:w-[40vw] w-[70vw] text-white py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

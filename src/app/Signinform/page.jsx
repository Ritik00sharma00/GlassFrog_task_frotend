"use client";
import React, { useContext, useState } from 'react';
import Inputfield from "@/components/FormComponents/Inputfield";
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserContext } from '@/components/HelperComponenet/UserContext';

const Signinform = () => {
  const router = useRouter();
  const { setToken, setUserId,token,userid ,username,setUsername} = useContext(UserContext);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmit = async (data) => {
    const { email, password } = data;
    let payload = { email, password };
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await axios.post(
        "https://glassfrog-db.onrender.com/api/login",
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
         
        // const userId = response.data.userId;

        const { token, userdetail} = response.data;
        localStorage.setItem('token', token);

        if (token!=null) {
          setToken(token);
          setUsername(userdetail.username);
          
          localStorage.setItem('username', userdetail.username);
          
          console.log(userdetail._id+"  this kwebjfbhesc,kjbsalibusvclj")
          setUserId(userdetail._id);
          localStorage.setItem('userId', userdetail._id);
          

          alert("Welcome"+userdetail.username);


         router.push( '/TaskManagement');
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-20 flex flex-col items-center">
      <h1 className='text-[#134B70] text-[24px] font-sans'>
        Log in to your Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} method='post' className="bg-white p-15 flex flex-col space-y-3">
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
          render={({ field }) => (
            <Inputfield
              {...field}
              label="Email"
              type="email"
              icon="📧"
              errors={errors.email}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-[13px]">{errors.email.message}</p>
        )}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
          render={({ field }) => (
            <Inputfield
              {...field}
              label="Password"
              type="password"
              icon="🔒"
              errors={errors.password?.message}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-[13px]">{errors.password.message}</p>
        )}

        {errorMsg && (
          <p className="text-red-500 text-[13px]">{errorMsg}</p>
        )}

        <Link href="/" className="text-[#508C9B]">
          Don't have an account?
        </Link>
        
        <button
          type="submit"
          className={`bg-blue-500 lg:w-[40vw] w-[70vw] text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default Signinform;

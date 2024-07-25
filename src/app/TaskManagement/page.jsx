"use client";
import React, {useEffect, useState, useContext} from "react";
import Inputfield from "@/components/FormComponents/Inputfield";
import {Controller, useForm} from "react-hook-form";
import Task from "./Task";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {UserContext} from "@/components/HelperComponenet/UserContext";

const Taskmanagement = () => {
    const {setToken, token, username, userId} = useContext(UserContext);

    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token === "null" || (!token && username == "") || username == null) {
            router.push("/404");
        }
    }, [router]);

    const [fetchagain, setfetchagain] = useState(false);
    const handleFetchAgainChange = (fetchAgain) => {
        setShouldFetch(fetchAgain);
    };

    //Here,it is  protecting this route,not using protected routes instead i have taken another approach.

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();

    //This is for the creation of tasks.

    const onSubmit = async (data) => {
        const {title, description, dueDate, status} = data;
        const payload = {title, description, dueDate, status};
        const userid = localStorage.getItem("userId");

        try {
            const response = await axios.post(`https://glassfrog-db.onrender.com/api/tasks/${userid}`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token", token).split(" ")[1]};`,
                },
            });
            console.log("Task created:", response.data);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };


    return (
        <div className=" bg-white">
            <h1 className=" text-[32px] text-[#584fda] font">Hello,{username} Update your tasks</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-full   md:pr-20 md:pl-20 md:pt-20 md:pb-2 p-0 py-4 flex flex-col items-center justify-center "
            >
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{required: "task is required"}}
                    render={({field}) => (
                        <Inputfield {...field} label="Give the name of your task" type="text" icon="📝" />
                    )}
                />
                {errors.title && <p className="text-red-500 text-[13px]">{errors.title.message}</p>}

                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{required: "task is required"}}
                    render={({field}) => <Inputfield {...field} label="Write the description " type="text" icon="📝" />}
                />
                {errors.description && <p className="text-red-500 text-[13px]">{errors.description.message}</p>}

                <Controller
                    name="dueDate"
                    control={control}
                    defaultValue=""
                    rules={{required: "task is required"}}
                    render={({field}) => <Inputfield {...field} label="" type="date" icon="📝" />}
                />
                {errors.dueDate && <p className="text-red-500 text-[13px]">{errors.dueDate.message}</p>}

                <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    rules={{required: "task is required"}}
                    render={({field}) => (
                        <Inputfield {...field} label="Write the status of your task" type="text" icon="📝" />
                    )}
                />
                {errors.status && <p className="text-red-500 text-[13px]">{errors.status.message}</p>}

                <button
                    type="submit"
                    className="bg-[#756fe4] md:text-[16px] text-[10px]  text-nowrap   xl:translate-x-[200%]   text-white py-1 md:px-4 px-2 rounded"
                >
                    Create Task
                </button>
            </form>
              

              {/* Here this is the  atsnkm compomennet   call */}
            <Task userId={userId} />
        </div>
    );
};

export default Taskmanagement;

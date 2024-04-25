import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import axios from "axios";

const Notification = () => {
    const [formData, setFormData] = useState({ name: '', message: '', image: null });

    const addNotification = async (formData) => {
        console.log("formData", formData)
        const data = new FormData();
        data.append('name', formData.name);
        data.append('message', formData.message);
        if (formData.image) {
            data.append('image', formData.image);
        }
        try {
            const response = await axios.post(`https://wave-backend-zulg.onrender.com/add_notification`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                alert(response.data.message)
            } else {
                return undefined;
            }

        } catch (error) {
            console.log("Error", error)

        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: files && files.length > 0 ? files[0] : value
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };


    const {
        mutate: authMutation,
        isLoading,
        isError,
    } = useMutation(addNotification, {
        onSuccess: (data) => {
            if (data !== undefined) {
                console.log("Notification added successfully");
            }
        },
        onError: (error) => {
            console.error("Error while adding notification:", error);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authMutation(formData);
        } catch (error) {
            console.error("Error while submitting notification:", error);
        }
    };

    return (
        <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-r from-rose-500 to-orange-500">
            <div className=" justify-center align-middle">
                <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
                    Add New Notification
                </h1>
                <form onSubmit={handleSubmit} className="w-auto lg:w-full grid space-y-4">

                    <div>
                        <label className="text-sm text-white ml-2">Title</label>
                        <input
                            name="name"
                            onChange={(e) => handleChange(e)}
                            className="p-2 rounded-md w-full bg-gray-50 border border-gray-300 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label for="message" class="block mb-2 text-sm font-medium text-white dark:text-white">Write Notification</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            onChange={(e) => handleChange(e)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                        ></textarea>
                    </div>

                    <div className="flex items-center space-x-6 mt-5">
                        {/* <div className="shrink-0">
                            <img
                                id='preview_img'
                                className="h-16 w-16 object-cover rounded-full text-white"
                                src={formData.image}
                                alt="Notification image"
                                onLoad={() => URL.revokeObjectURL(formData.image)}
                            />
                        </div> */}
                        <label className="block">
                            <span className="sr-only">Choose Notification image</span>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="block w-full text-sm text-white
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100"
                            />
                        </label>
                    </div>

                    <div className="flex items-center space-x-6 mt-10">
                        <Button variant="default" className=' w-full '>Add</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(Notification);

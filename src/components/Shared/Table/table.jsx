import React, { memo, useEffect, useState } from "react";
import axios from 'axios'
const Table = () => {


    // const [tableData, setTableData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://wave-backend-zulg.onrender.com/get_channel`);
                if (response.data.success) {
                    console.log(response.data.data)
                    setTableData(response.data.data);
                } else {
                    console.log('Request was not successful');
                }
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchData();
    }, []);

    const [tableData, setTableData] = useState([]);  // Initialize tableData as an empty array

    const handleToggle = async (id, status) => {
        try {
            let newStatus = !status
            const response = await axios.put(`https://wave-backend-zulg.onrender.com/update_channel`, {
                id: id,
                status: !status
            });

            if (response.data.success) {
                const newTableData = tableData.map(item => {
                    if (item._id === id) {
                        return { ...item, status: newStatus };
                    }
                    return item;
                });

                setTableData(newTableData);
            } else {
                console.error('Failed to update the channel', response.data.message);
            }
        } catch (error) {
            console.error("Error updating channel:", error);
        }
    };

    return (


        <div class="relative overflow-x-auto mt-10">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        {/* <th scope="col" class="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Image
                        </th> */}
                        <th scope="col" class="px-6 py-3">
                            Stauts
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item) => (
                        <tr key={item._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </td>
                            {/* <td class="px-6 py-4">
                                {item.address}
                            </td>
                            <td class="px-6 py-4">
                                <img src={item.imageUrl} alt="Profile Image" style={{ width: "50px", height: "auto" }} />
                            </td> */}
                            <td class="px-6 py-4">
                                <label class="inline-flex items-center me-5 cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer" checked={item.status || false}
                                        onChange={() => handleToggle(item._id, item.status)} />
                                    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                                    {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Red</span> */}
                                </label>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default memo(Table);

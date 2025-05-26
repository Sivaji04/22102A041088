import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const StockPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://20.244.56.144/evaluation-service/stocks/NVDA")
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Stock Price Chart</h2>
            <LineChart width={800} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default StockPage;
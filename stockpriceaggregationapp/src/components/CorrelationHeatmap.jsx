import React from "react";
import { pearsonCorrelation } from "../utils/analytics";

const CorrelationHeatmap = ({ stockData }) => {
    const stocks = Object.keys(stockData);
    const matrix = stocks.map(row =>
        stocks.map(col => {
            const corr = pearsonCorrelation(stockData[row], stockData[col]);
            return Number(corr.toFixed(2));
        })
    );

    return (
        <div>
            <h2>Correlation Heatmap</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {stocks.map(stock => <th key={stock}>{stock}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, i) => (
                        <tr key={i}>
                            <th>{stocks[i]}</th>
                            {row.map((val, j) => (
                                <td key={j} style={{ backgroundColor: `rgba(255,0,0,${Math.abs(val)})` }}>
                                    {val}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CorrelationHeatmap;
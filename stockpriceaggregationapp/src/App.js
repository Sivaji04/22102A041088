import React from "react";
import StockPage from "./components/StockPage";
import CorrelationHeatmap from "./components/CorrelationHeatmap";

function App() {
    const dummyStockData = {
        AAPL: [150, 152, 153, 155, 154],
        MSFT: [300, 302, 301, 303, 304],
        GOOGL: [2700, 2710, 2720, 2730, 2740]
    };

    return (
      <>
        <div className="app">
            <h1>React Stock Aggregator</h1>
            <StockPage />
            <CorrelationHeatmap stockData={dummyStockData} />
        </div>
        </>
    );
}

export default App;
import { useEffect } from "react";
import { sampleData } from "../data/item";
import { SimulateWebSocket } from "./Simul";
import { useDispatch } from "react-redux";
// import { useCryptoData } from "../store/cryptoSlice";
import { cryptoActions, useCryptoData } from "../store/cryptoSlice";

const CryptoTable = () => {
  const dispatch = useDispatch();
  const { prices, prevPrices } = useCryptoData();

  const { updatePrices } = cryptoActions;

  const getPriceClass = (symbol, price) => {
    const prev = prevPrices[symbol];
    if (prev === undefined) return "";
    return price > prev ? "text-green-600" : price < prev ? "text-red-600" : "";
  };

  useEffect(() => {
    SimulateWebSocket((data) => dispatch(updatePrices(data)));
  }, [dispatch]);

  const formatNumber = (num) => {
    return num?.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const formatPercent = (value) => {
    const arrow = value > 0 ? "▲" : value < 0 ? "▼" : "";
    const colorClass =
      value > 0 ? "text-green-600" : value < 0 ? "text-red-600" : "";
    return (
      <span className={colorClass}>
        {arrow} {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border rounded-2xl shadow-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">1h %</th>
            <th className="p-3">24h %</th>
            <th className="p-3 ">7d %</th>
            <th className="p-3 text-right pr-6">Market Cap</th>
            <th className="p-3 text-right pr-6">Volume(24h)</th>
            <th className="p-3 text-right">Circulating Supply</th>
            {/* <th className="p-3  text-right pr-6">Max Supply</th> */}
            <th className="p-3">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((coin, index) => (
            <tr key={coin.symbol} className="border-t">
              <td className="p-3">{index + 1}</td>

              <td className="p-3">
                <div className="flex items-center gap-2">
                  <img src={coin.logo} alt={coin.name} className="h-8 w-8" />
                  <span>
                    {coin.name} {coin.symbol}
                  </span>
                </div>
              </td>
              <td className={`p-3 ${getPriceClass(coin.symbol, coin.price)}`}>
                ${formatNumber(coin.price)}
              </td>

              <td className="p-3">{formatPercent(coin.change1h)}</td>
              <td className="p-3">{formatPercent(coin.change24h)}</td>
              <td className="p-3">{formatPercent(coin.change7d)}</td>

              <td className="p-3 text-right">
                ${formatNumber(coin.marketCap)}
              </td>

              <td className="p-3 text-right">
                <div className="flex flex-col ">
                  <span>${formatNumber(coin.volume24h)}</span>
                  <span className="text-gray-500 text-sm">
                    {coin.volumeUnit}
                  </span>
                </div>
              </td>

              <td className="p-3 text-right pr-6">
                {formatNumber(coin.circulatingSupply)} {coin.symbol}
              </td>

              {/* <td className="p-3 text-right">
                {coin.maxSupply ? formatNumber(coin.maxSupply) : "∞"}
              </td> */}

              <td className="p-3">
                <img src={coin.chart} alt="7D chart" className="w-24" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;

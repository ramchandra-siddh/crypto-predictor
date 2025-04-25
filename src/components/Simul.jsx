import { sampleData } from "../data/item";

export function SimulateWebSocket(callback) {
  const getRamdomChange = () => {
    return parseFloat((Math.random() * 2 - 1).toFixed(2));
  };

  const getRandomMultiplier = () => {
    return 1 + (Math.random() * 0.02 - 0.01);
  };

  const formatWithSuffix = (num) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  setInterval(() => {
    const updateData = sampleData.map((asset) => {
      const priceMultiplier = getRandomMultiplier();
      const volumeMultiplier = getRandomMultiplier();

      const newPrice = parseFloat((asset.price * priceMultiplier).toFixed(2));
      const newVolume = parseFloat(
        (asset.volume24h * volumeMultiplier).toFixed(2)
      );

      const volumeAmount = newVolume / newPrice;
      const volumeUnit = `${formatWithSuffix(volumeAmount)} ${asset.symbol}`;
      return {
        ...asset,
        price: newPrice,
        change1h: getRamdomChange(),
        change24h: getRamdomChange(),
        volume24h: newVolume,
        volumeUnit,
        circulatingSupply: formatWithSuffix(asset.supply),
      };
    });
    callback(updateData);
  }, 1500);
}
const Simul = () => {
  return <div></div>;
};

export default Simul;

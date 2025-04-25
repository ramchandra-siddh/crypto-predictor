import "./App.css";
import CryptoTable from "./components/CryptoTable";
import Simul from "./components/Simul";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">Crypto Tracker</h1>
      <Simul></Simul>
      <CryptoTable></CryptoTable>
    </div>
  );
};

export default App;

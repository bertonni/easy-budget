import Budgets from "./pages/Budgets";
import Home from "./pages/Home";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faEdit,
  faTrash,
  faCheck,
  faUser,
  faPlus,
  faWallet,
  faMoneyBill,
  faCreditCard,
  faChartLine,
  faUtensils,
  faBoltLightning,
  faFaucet,
  faBasketShopping,
  faBurger,
  faFileInvoice,
  faKitMedical,
  faPhone,
  faWifi,
  faHome,
  faBullseye,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Incomes from "./pages/Incomes";
import Activities from "./pages/Activities";

library.add(
  fab,
  faEdit,
  faTrash,
  faCheck,
  faUser,
  faTimes,
  faPlus,
  faWallet,
  faMoneyBill,
  faCreditCard,
  faChartLine,
  faUtensils,
  faBoltLightning,
  faFaucet,
  faBasketShopping,
  faBurger,
  faFileInvoice,
  faKitMedical,
  faPhone,
  faWifi,
  faHome,
  faBullseye,
  faEye
);

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="/" element={<Home />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/incomes" element={<Incomes />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
            <Link
              to="/"
              className="mt-2 border rounded border-gray-600 text-gray-600 py-2 px-3"
            >
              Go to Home page
            </Link>
          </main>
        }
      />
    </Routes>
  );
}

export default App;

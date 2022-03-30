import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AddExpenseButton from "./budgets/AddExpenseButton";
import AddIncomeButton from "./incomes/AddIncomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Container({
  children,
  title,
  page,
  confirmBox,
  addIncomeModal = null,
  editIncomeModal = null,
  editBudgetModal = null,
  addBudgetModal = null,
  addExpenseModal = null,
  showIncomeModal,
  showExpenseModal,
}) {
  const classes = `min-h-screen min-w-screen flex flex-col items-center md:px-10 relative`;

  // const { budgets } = useBudgets();

  return (
    <div className={classes}>
      {confirmBox}
      {addIncomeModal}
      {editIncomeModal}
      {editBudgetModal}
      {addBudgetModal}
      {addExpenseModal}
      {/* <MenuTop page={page} /> */}
      <div className="px-5 w-full">
        {title && (
          <h1 className="text-4xl font-bold mt-6 text-gray-100">
            {title}
          </h1>
        )}
      </div>
      <AnimatePresence exitBeforeEnter>
        <div
          className="flex-grow w-full h-[calc(100vh-300px)] overflow-y-auto my-4 px-5"
        >
          {children}
        </div>
      </AnimatePresence>
      <div className="flex justify-between">
        {page === "Receitas" && (
          <div className="flex items-center justify-end mb-4">
            <AddIncomeButton show={showIncomeModal} />
          </div>
        )}
        {page === "Despesas" && (
          <div className="flex items-center gap-4 justify-end mb-4">
            {/* <AddBudgetButton show={showBudgetModal} /> */}
            <AddExpenseButton show={showExpenseModal} />
          </div>
        )}
      </div>
      <div
        className="h-20 flex items-center justify-around bg-gradient-to-r from-gray-600
        to-gray-700 text-white w-full backdrop-blur"
      >
        <Link
          to="/"
          title="Início"
          className={`w-full h-full flex flex-col items-center gap-1 justify-center ${
            page === "Home" ? "text-amber-500 pointer-events-none" : ""
          }`}
        >
          <FontAwesomeIcon icon="home" size="xl" />
          <span className="text-xs uppercase">INÍCIO</span>
        </Link>
        <Link
          to="/incomes"
          title="Receitas"
          className={`w-full h-full flex flex-col items-center gap-1 justify-center ${
            page === "Receitas" ? "text-amber-500 pointer-events-none" : ""
          }`}
        >
          <FontAwesomeIcon icon="money-bill" size="xl" />
          <span className="text-xs uppercase">RECEITAS</span>
        </Link>
        <Link
          to="/budgets"
          title="Despesas"
          className={`w-full h-full flex flex-col items-center gap-1 justify-center ${
            page === "Despesas" ? "text-amber-500 pointer-events-none" : ""
          }`}
          >
          <FontAwesomeIcon icon="file-invoice" size="xl" />
          <span className="text-xs uppercase">DESPESAS</span>
        </Link>
        <Link
          to="/"
          title="Perfil"
          className={`w-full h-full flex flex-col items-center gap-1 justify-center ${
            page === "Profile" ? "text-amber-500 pointer-events-none" : ""
          }`}
        >
          <FontAwesomeIcon icon="user" size="xl" />
          <span className="text-xs uppercase">PERFIL</span>
        </Link>
      </div>
    </div>
  );
}

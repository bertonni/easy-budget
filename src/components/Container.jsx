import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AddExpenseButton from "./budgets/AddExpenseButton";
import AddIncomeButton from "./incomes/AddIncomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBudgets } from "../contexts/BudgetsContext";
import { useAuth } from "../contexts/AuthContext";
import CustomLink from "./CustomLink";
import ChangeMonthModal from "./ChangeMonthModal";

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

  const [changeCurrentMonth, setChangeCurrentMonth] = useState(false);
  const { currYear, selectedMonth } = useBudgets();
  const { user } = useAuth();

  const showChangeCurrentMonthInput = () => setChangeCurrentMonth(true);

  return (
    <div className={classes}>
      <ChangeMonthModal show={changeCurrentMonth} closeModal={() => setChangeCurrentMonth(false)} />
      {confirmBox}
      {addIncomeModal}
      {editIncomeModal}
      {editBudgetModal}
      {addBudgetModal}
      {addExpenseModal}
      {/* <MenuTop page={page} /> */}
      <div className="px-5 w-full flex items-end justify-between">
        {title && (
          <>
            <h1 className="text-4xl font-bold mt-6 text-gray-100">{title}</h1>
            <div className="flex flex-col">
              {user && !changeCurrentMonth && (
                <button
                  onClick={showChangeCurrentMonthInput}
                  className="uppercase rounded bg-sky-400 hover:bg-sky-500 text-gray-700 text-sm px-1 transition-all"
                >
                  alterar
                </button>
              )}
              <span className="text-gray-50">
                Ref {selectedMonth}/{currYear}
              </span>
            </div>
          </>
        )}
      </div>
      <AnimatePresence exitBeforeEnter>
        <div className="flex-grow w-full h-[calc(100vh-300px)] overflow-y-auto my-4 px-5">
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
            <AddExpenseButton show={showExpenseModal} />
          </div>
        )}
      </div>
      <div
        className="h-20 flex items-center justify-around bg-gradient-to-r from-gray-600
        to-gray-700 text-white w-full backdrop-blur"
      >
        <CustomLink to="/" title="Início">
          <FontAwesomeIcon icon="home" size="xl" />
          <span className="text-xs uppercase">INÍCIO</span>
        </CustomLink>
        <CustomLink to="/incomes" title="Receitas">
          <FontAwesomeIcon icon="money-bill" size="xl" />
          <span className="text-xs uppercase">RECEITAS</span>
        </CustomLink>
        <CustomLink to="/budgets" title="Despesas">
          <FontAwesomeIcon icon="file-invoice" size="xl" />
          <span className="text-xs uppercase">DESPESAS</span>
        </CustomLink>
        <CustomLink to="/profile" title="Perfil">
          <FontAwesomeIcon icon="user" size="xl" />
          <span className="text-xs uppercase">PERFIL</span>
        </CustomLink>
      </div>
    </div>
  );
}

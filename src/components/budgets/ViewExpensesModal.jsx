/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBudgets } from "../../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 50, opacity: 1 },
  transition: { duration: 0.3, type: "just" },
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default function ViewExpensesModal({
  show,
  setViewExpensesModal,
  budgetId,
  name,
}) {
  const { budgets, currYear, currMonth, deleteExpense } = useBudgets();
  const [expenses, setExpenses] = useState(
    budgets[currYear][currMonth].expenses
  );

  useEffect(() => {
    setExpenses(budgets[currYear][currMonth].expenses);
  }, [show]);

  function handleDeleteExpense(expense) {
    const newExpenses = expenses.filter((exp) => exp.id !== expense.id);
    setExpenses(newExpenses);
    deleteExpense(expense);
  }

  function handleStopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-start"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={() => setViewExpensesModal(false)}
        >
          <motion.div
            className="relative w-full sm:max-w-sm md:max-w-md my-0 mx-5 md:mx-10 py-5 px-5 bg-white
              max-h-80 flex flex-col justify-center gap-2 z-40 rounded text-gray-600"
            variants={modal}
            transition="transition"
            onMouseDown={(e) => handleStopPropagation(e)}
          >
            <span
              onMouseDown={() => setViewExpensesModal(false)}
              className="h-5 w-5 p-3 absolute top-1 right-1 z-50 hover:opacity-70
                hover:cursor-pointer flex items-center justify-center"
            >
              <FontAwesomeIcon icon="times" />
            </span>
            <h1 className="text-xl font-bold text-left">{name}</h1>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden"
            >
              {expenses.length === 0 ? (
                <h1>Não há nenhuma despesa para essa categoria</h1>
              ) : (
                expenses.map((expense) => {
                  return (
                    <motion.div
                      variants={item}
                      key={expense.id}
                      className="h-10 flex items-center w-full gap-2 cursor-pointer
                       hover:bg-gray-200 px-2 rounded"
                    >
                      <h2 className="grow">{expense.description}</h2>
                      <span>{currencyFormatter.format(expense.amount)}</span>
                      <button
                        onClick={() => handleDeleteExpense(expense)}
                        title="Delete Expense"
                        className="py-1 px-2 text-center bg-red-300 text-white rounded flex
                      items-center justify-center hover:bg-red-400"
                      >
                        <FontAwesomeIcon icon="times" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

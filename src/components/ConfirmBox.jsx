import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useBudgets } from "../contexts/BudgetsContext";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 50, opacity: 1 },
  transition: { duration: 0.3, type: "just" },
};

export default function ConfirmBox({ show, budgetId, incomeId, setShowConfirmBox, removed }) {
  const { deleteBudget, deleteIncome } = useBudgets();

  function handleStopPropagation(e) {
    e.stopPropagation();
  }

  function handleConfirm(value) {
    if (value) removed(true);
    if (value && budgetId) deleteBudget(budgetId);
    if (value && incomeId) deleteIncome(incomeId);
    setShowConfirmBox(false);
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10 flex justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={() => setShowConfirmBox(false)}
        >
          <motion.div
            className="relative w-full sm:max-w-sm md:max-w-md my-0 mx-5 md:mx-10 p-5
              bg-white max-h-40 flex flex-col justify-center items-center gap-2 z-40 rounded"
            variants={modal}
            transition="transition"
            onMouseDown={(e) => handleStopPropagation(e)}
          >
            <h1 className="text-xl text-center text-gray-600 font-bold">
              Tem certeza que deseja remover?
            </h1>
            <h3 className="text-lg text-center text-gray-600 -mt-2">
              Esta ação não poderá ser desfeita
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleConfirm(false)}
                className="py-1 px-3 bg-red-400 border border-bg-red-400 text-white
                  text-lg rounded hover:bg-red-500 transition-all w-32"
              >
                Cancelar <FontAwesomeIcon icon="times" />
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className="py-1 px-3 bg-blue-400 border border-bg-blue-400 text-white
                  text-lg rounded hover:bg-blue-500 transition-all w-32"
              >
                Confirmar <FontAwesomeIcon icon="check" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

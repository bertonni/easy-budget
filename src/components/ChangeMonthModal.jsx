import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

export default function ChangeMonthModal({ show, closeModal }) {
  const { budgets, currYear, selectedMonth, setSelectedMonth, setCurrentBudget } = useBudgets();
  const [refValue, setRefValue] = useState(selectedMonth);

  const handleMonthChange = (e) => { setRefValue(e.target.value) };

  const changeCurrentMonth = () => {
    setSelectedMonth(refValue);
    setCurrentBudget(budgets[currYear][refValue]);
    closeModal();
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  if (!show) return <></>;

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex
            justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={() => closeModal()}
        >
          <motion.div
            className="relative w-full sm:max-w-sm md:max-w-md my-0 mx-5 md:mx-10 py-5 px-5
              bg-white max-h-40 flex flex-col justify-center gap-2 z-40 rounded"
            variants={modal}
            transition="transition"
            onMouseDown={(e) => handleStopPropagation(e)}
          >
            <span
              onMouseDown={() => closeModal()}
              className="h-5 w-5 p-3 absolute top-1 right-1 z-50 hover:opacity-70
              hover:cursor-pointer flex items-center justify-center"
            >
              <FontAwesomeIcon icon="times" />
            </span>
            <h1 className="text-xl font-bold text-left text-gray-600">
              Alterar mês
            </h1>
            <div className="relative mt-5">
              <select
                value={refValue}
                name="reference"
                id="reference-month"
                className="select"
                onChange={(e) => handleMonthChange(e)}
              >
                {Object.keys(budgets[currYear]).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                })}
                {/* <option value="new">Novo Meio de Pagamento</option> */}
              </select>
              <label htmlFor="budget" className="select-label">
                Mês de referência
              </label>
            </div>
            <div className="relative mt-1 flex justify-end" onClick={changeCurrentMonth}>
              <button
                type="submit"
                className="py-1 px-3 bg-gradient-to-r from-sky-500 border to-indigo-500 border-sky-500
                text-white flex items-center gap-2 rounded hover:opacity-70 hover:border-sky-400 
                  min-w-32 transition-all justify-center uppercase"
              >
                alterar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

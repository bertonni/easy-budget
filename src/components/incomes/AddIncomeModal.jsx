import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useBudgets } from "../../contexts/BudgetsContext";
import CloseButton from "../CloseButton";
import Input from "../Input";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 50, opacity: 1 },
  transition: { duration: 0.3, type: "just" },
};
export default function AddIncomeModal({
  show,
  setShowAddIncomeModal,
  incomeId,
}) {
  const descriptionRef = useRef();
  const valueRef = useRef();
  const [valueError, setValueError] = useState(false);

  const { addIncome } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();

    const regEx = /^([0-9]+(\.|,)?[0-9]{0,2})+$/;
    const description = descriptionRef.current.value;
    const value = valueRef.current.value;

    if (!value.match(regEx)) {
      setValueError(true);
      return;
    }

    setValueError(false);

    const newIncome = { description, value: parseFloat(value) };
    addIncome(newIncome);
    setShowAddIncomeModal(false);
  }

  function handleStopPropagation(e) {
    e.stopPropagation();
  }

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
          onMouseDown={() => setShowAddIncomeModal(false)}
        >
          <motion.div
            className="relative w-full sm:max-w-sm md:max-w-md my-0 mx-5 md:mx-10 py-5 px-5
              bg-white max-h-60 flex flex-col justify-center gap-2 z-40 rounded"
            variants={modal}
            transition="transition"
            onMouseDown={(e) => handleStopPropagation(e)}
          >
            <span
              onMouseDown={() => setShowAddIncomeModal(false)}
              className="h-5 w-5 p-3 absolute top-1 right-1 z-50 hover:opacity-70
              hover:cursor-pointer flex items-center justify-center"
            >
              <FontAwesomeIcon icon="times" />
            </span>
            <h1 className="text-xl font-bold text-left text-gray-600">
              Adicionar Receita
            </h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-2"
            >
              <Input
                id="description"
                customRef={descriptionRef}
                placeholder="Descrição"
                label="Descrição"
              />
              <Input
                id="max"
                type="number"
                customRef={valueRef}
                placeholder="Valor"
                label="Valor"
                step={0.01}
                error={valueError}
                errorMessage="Por favor, insira um número válido"
              />
              <div className="flex items-center justify-end gap-2">
                <CloseButton close={() => setShowAddIncomeModal(false)} />
                <button
                  type="submit"
                  className="py-1 px-3 bg-gradient-to-r from-sky-500 border to-indigo-500
                    border-sky-500 text-white flex items-center gap-2 rounded hover:opacity-70 
                    min-w-32 transition-all justify-center uppercase hover:border-sky-400"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

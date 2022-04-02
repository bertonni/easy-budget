import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useBudgets } from "../../contexts/BudgetsContext";
// import CloseButton from "../CloseButton";
// import Input from "../Input";
import AddExpenseForm from "./AddExpenseForm";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 50, opacity: 1 },
  transition: { duration: 0.3, type: "just" },
};

export default function AddExpenseModal({
  show,
  setShowAddExpenseModal,
  defaultBudgetId,
}) {
  const newCategoryRef = useRef(null);
  const newPaymentMethodRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const dateRef = useRef(null);
  const budgetIdRef = useRef(null);

  const [type, setType] = useState("fixed");
  const [installmentsCurrent, setInstallmentsCurrent] = useState(1);
  const [installmentsTotal, setInstallmentsTotal] = useState(1);
  const [hasInstallments, setHasInstallments] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [amountError, setAmountError] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewPaymentMethodInput, setShowNewPaymentMethodInput] =
    useState(false);

  const {
    addExpense,
    categories,
    addCategory,
    paymentMethods,
    addPaymentMethod,
  } = useBudgets();

  function handleClose() {
    setAmountError(false);
    setShowNewCategoryInput(false);
    setShowNewPaymentMethodInput(false);
    setShowAddExpenseModal(false);
  }

  function handleStopPropagation(e) {
    e.stopPropagation();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const regEx = /^([0-9]+(\.|,)?[0-9]{0,2})+$/;
    const description = descriptionRef.current?.value;
    const newCategory = newCategoryRef.current?.value || null;
    const newPaymentMethod = newPaymentMethodRef.current?.value || null;
    const amount = amountRef.current?.value;
    const date = dateRef.current?.value;
    const installments = hasInstallments ? installmentsTotal : 1;
    const budgetId = budgetIdRef.current?.value;
    const category = budgetId ? budgetId : newCategory;
    const paymentMethod = newPaymentMethod ? newPaymentMethod : paymentMethodRef.current.value;

    if (newCategory) {
      if (!categories.includes(newCategory)) addCategory(newCategory);
    }

    if (newPaymentMethod) {
      if (!paymentMethods.includes(newPaymentMethod))
        addPaymentMethod(newPaymentMethod);
    }

    if (!amount.match(regEx)) {
      setAmountError(true);
      return;
    }

    setAmountError(false);
    setShowNewCategoryInput(false);
    setShowNewPaymentMethodInput(false);

    const newExpense = {
      description,
      date,
      type,
      paymentMethod,
      installments: {
        current: hasInstallments ? parseInt(installmentsCurrent) : 1,
        total: parseInt(installments),
      },
      amount: parseFloat(amount),
      category,
    };
    addExpense(newExpense);
    setShowAddExpenseModal(false);
  }

  function handleSelectChange() {
    const selectedValue = budgetIdRef.current.value;
    if (selectedValue === "new") {
      setShowNewCategoryInput(true);
    }
  }

  function handleSelectPaymentMethodChange() {
    const selectedValue = paymentMethodRef.current.value;
    if (selectedValue === "new") {
      setShowNewPaymentMethodInput(true);
    }
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={() => handleClose()}
        >
          <motion.div
            className="relative w-full sm:max-w-md md:max-w-md my-0 mx-5 md:mx-10 py-5 px-5 bg-white
              max-h-120 flex flex-col justify-center gap-2 z-40 rounded"
            variants={modal}
            transition="transition"
            onMouseDown={(e) => handleStopPropagation(e)}
          >
            <span
              onClick={handleClose}
              className="h-5 w-5 p-3 absolute top-1 right-1 z-50 hover:opacity-70
              hover:cursor-pointer flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon="times"
                size="xl"
                className="text-gray-600"
              />
            </span>
            <h1 className="text-xl font-bold text-left text-gray-600">
              Adicionar Despesa
            </h1>
            <AddExpenseForm
              amountError={amountError}
              amountRef={amountRef}
              budgetIdRef={budgetIdRef}
              categories={categories}
              date={date}
              dateRef={dateRef}
              setDate={setDate}
              defaultBudgetId={defaultBudgetId}
              descriptionRef={descriptionRef}
              handleClose={handleClose}
              handleSelectChange={handleSelectChange}
              handleSelectPaymentMethodChange={handleSelectPaymentMethodChange}
              handleSubmit={handleSubmit}
              hasInstallments={hasInstallments}
              installmentsCurrent={installmentsCurrent}
              installmentsTotal={installmentsTotal}
              newCategoryRef={newCategoryRef}
              newPaymentMethodRef={newPaymentMethodRef}
              paymentMethodRef={paymentMethodRef}
              paymentMethods={paymentMethods}
              setHasInstallments={setHasInstallments}
              setInstallmentsCurrent={setInstallmentsCurrent}
              setInstallmentsTotal={setInstallmentsTotal}
              setShowNewCategoryInput={setShowNewCategoryInput}
              setShowNewPaymentMethodInput={setShowNewPaymentMethodInput}
              setType={setType}
              showNewCategoryInput={showNewCategoryInput}
              showNewPaymentMethodInput={showNewPaymentMethodInput}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

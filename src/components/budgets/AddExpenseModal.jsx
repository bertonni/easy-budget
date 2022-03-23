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
        current: hasInstallments ? installmentsCurrent : 1,
        total: installments,
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
            className="relative w-full sm:max-w-sm md:max-w-md my-0 mx-5 md:mx-10 py-5 px-5 bg-white
              max-h-116 flex flex-col justify-center gap-2 z-40 rounded"
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
            {/* <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-2"
            >
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="fixed"
                    name="type"
                    onChange={() => setType("fixed")}
                    required
                  />
                  <label className="pr-4" htmlFor="fixed">
                    Fixa
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="variable"
                    name="type"
                    onChange={() => setType("variable")}
                    required
                  />
                  <label className="pr-4" htmlFor="variable">
                    Variável
                  </label>
                </div>
              </div>
              <Input
                id="description"
                customRef={descriptionRef}
                placeholder="Descrição"
                label="Descrição"
                required
              />
              <Input
                id="amount"
                type="number"
                min={0}
                step={0.01}
                customRef={amountRef}
                placeholder="Valor"
                label="Valor"
                error={amountError}
                errorMessage="Por favor, insira um número válido"
              />
              {showNewPaymentMethodInput ? (
                <div className="flex gap-1">
                  <Input
                    customRef={newPaymentMethodRef}
                    id="new-payment-method"
                    placeholder={"Nova Meio de Pagamento"}
                    label="Novo Meio de Pagamento"
                    grow
                  />
                  <FontAwesomeIcon
                    icon="times"
                    className="h-10 text-red-300 self-end px-2 cursor-pointer"
                    onClick={() => setShowNewPaymentMethodInput(false)}
                  />
                </div>
              ) : (
                <div className="relative mt-4">
                  <select
                    ref={paymentMethodRef}
                    name="payment"
                    id="payment-method"
                    className="select"
                    defaultValue={defaultBudgetId}
                    onChange={handleSelectPaymentMethodChange}
                  >
                    {paymentMethods.map((method, index) => {
                      return (
                        <option key={index} value={method}>
                          {method}
                        </option>
                      );
                    })}
                    <option value="new">Novo Meio de Pagamento</option>
                  </select>
                  <label htmlFor="budget" className="select-label">
                    Meio de Pagamento
                  </label>
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <div className="flex-grow w-full">
                  <Input
                    id="date"
                    type="date"
                    customRef={dateRef}
                    value={date}
                    placeholder="Data"
                    label="Data"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center w-6/12 gap-1 relative">
                  <input
                    type="checkbox"
                    value="installments"
                    className="absolute top-0 right-0 border border-gray-300 w-10"
                    onChange={(e) => setHasInstallments(e.target.checked)}
                  />
                  <Input
                    id="installments"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="Parcelas"
                    value={installmentsCurrent}
                    disabled={!hasInstallments}
                    label="Parcelas"
                    onChange={(e) => setInstallmentsCurrent(e.target.value)}
                  />
                  <span className="text-xl mb-2 self-end">/</span>
                  <Input
                    id="installments"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="Parcelas"
                    value={installmentsTotal}
                    disabled={!hasInstallments}
                    label=""
                    onChange={(e) => setInstallmentsTotal(e.target.value)}
                  />
                </div>
              </div>
              {showNewCategoryInput ? (
                <div className="flex gap-1">
                  <Input
                    customRef={newCategoryRef}
                    id="new-category"
                    placeholder={"Nova categoria"}
                    label="Nova Categoria"
                    grow
                  />
                  <FontAwesomeIcon
                    icon="times"
                    className="h-10 text-red-300 self-end px-2 cursor-pointer"
                    onClick={() => setShowNewCategoryInput(false)}
                  />
                </div>
              ) : (
                <div className="relative mt-4">
                  <select
                    ref={budgetIdRef}
                    name="budget"
                    id="budget"
                    className="select"
                    defaultValue={defaultBudgetId}
                    onChange={handleSelectChange}
                  >
                    <option value="uncategorized">Sem Categoria</option>
                    {categories.map((category, index) => {
                      return (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      );
                    })}
                    <option value="new">Nova Categoria</option>
                  </select>
                  <label htmlFor="budget" className="select-label">
                    Categoria
                  </label>
                </div>
              )}
              <div className="flex items-center justify-end gap-2">
                <CloseButton close={handleClose} />
                <button
                  type="submit"
                  className="py-1 px-3 bg-gradient-to-r from-sky-500 border to-indigo-500 border-sky-500
                  text-white flex items-center gap-2 rounded hover:opacity-70 hover:border-sky-400 
                  min-w-32 transition-all justify-center uppercase"
                >
                  Adicionar
                </button>
              </div>
            </form> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

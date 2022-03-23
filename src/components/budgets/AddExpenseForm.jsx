import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CloseButton from "../CloseButton";
import Input from "../Input";

export default function AddExpenseForm({
  handleSubmit,
  setType,
  descriptionRef,
  amountRef,
  amountError,
  showNewPaymentMethodInput,
  newPaymentMethodRef,
  setShowNewPaymentMethodInput,
  paymentMethodRef,
  defaultBudgetId,
  handleSelectPaymentMethodChange,
  paymentMethods,
  dateRef,
  date,
  setDate,
  setHasInstallments,
  hasInstallments,
  installmentsCurrent,
  setInstallmentsCurrent,
  installmentsTotal,
  setInstallmentsTotal,
  showNewCategoryInput,
  newCategoryRef,
  setShowNewCategoryInput,
  budgetIdRef,
  handleSelectChange,
  categories,
  handleClose
}) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
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
            // defaultValue={defaultBudgetId}
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
    </form>
  );
}

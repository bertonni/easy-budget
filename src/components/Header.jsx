import AddBudgetButton from "./budgets/AddBudgetButton";
import AddExpenseButton from "./budgets/AddExpenseButton";
import AddIncomeButton from "./incomes/AddIncomeButton";

export default function Header({
  title,
  showBudgetModal,
  showExpenseModal,
  showIncomeModal,
  textColor = "text-gray-600",
}) {
  return (
    <div className="flex flex-col justify-between gap-2 py-5 md:px-10 w-full sticky top-0 z-10">
      <div className="flex justify-between">
        <h1 className={`text-3xl font-medium ${textColor}`}>{title}</h1>
        {showIncomeModal && <AddIncomeButton show={showIncomeModal} />}
        {!showIncomeModal && (
          <div className="hidden sm:flex gap-2 justify-end">
            {showBudgetModal && <AddBudgetButton show={showBudgetModal} />}
            {showExpenseModal && <AddExpenseButton show={showExpenseModal} />}
          </div>
        )}
      </div>
      {!showIncomeModal && (
        <div className="flex sm:hidden gap-2 justify-end">
          {showBudgetModal && <AddBudgetButton show={showBudgetModal} />}
          {showExpenseModal && <AddExpenseButton show={showExpenseModal} />}
        </div>
      )}
    </div>
  );
}

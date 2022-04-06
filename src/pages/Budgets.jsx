import { useEffect, useState, useRef } from "react";
import BudgetCard from "../components/budgets/BudgetCard";
import Container from "../components/Container";
import AddBudgetModal from "../components/budgets/AddBudgetModal";
import EditBudgetModal from "../components/budgets/EditBudgetModal";
import AddExpenseModal from "../components/budgets/AddExpenseModal";
import { useBudgets } from "../contexts/BudgetsContext";
import ConfirmBox from "../components/ConfirmBox";

export default function Budgets() {
  const {
    budgets,
    currYear,
    selectedMonth,
    getFixedExpenses,
    getVariableExpenses,
  } = useBudgets();


  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [budgetId, setBudgetId] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetMax, setBudgetMax] = useState(0);
  const [totalAmounts, setTotalAmounts] = useState(0);

  const ref = useRef();
  ref.current = () => {
    setFixedExpenses(getFixedExpenses);
    setVariableExpenses(getVariableExpenses);
  };

  const [fixedExpenses, setFixedExpenses] = useState(getFixedExpenses);
  const [variableExpenses, setVariableExpenses] = useState(getVariableExpenses);

  const totalFixedAmount = fixedExpenses.length > 0 ? fixedExpenses
    .map((expense) => expense.amount)
    .reduce((a, b) => a + b) : 0;

  const totalVariableAmount = variableExpenses.length > 0 ? variableExpenses
    .map((expense) => expense.amount)
    .reduce((a, b) => a + b) : 0;

  useEffect(() => {
    if (budgets[currYear][selectedMonth].expenses.length > 0) {
      setTotalAmounts(budgets[currYear][selectedMonth].totalExpenses);
      ref.current();
    }
  }, [budgets, currYear, selectedMonth]);

  function handleEditBudgetModal(value, id, name, max) {
    setShowEditBudgetModal(value);
    if (id === null) return;
    setBudgetId(id);
    setBudgetName(name);
    setBudgetMax(max);
  }

  const handleConfirmDelete = (id, value) => {
    setBudgetId(id);
    setShowConfirmBox(value);
  };

  return (
    <Container
      page="Despesas"
      title="Despesas"
      showBudgetModal={setShowAddBudgetModal}
      showExpenseModal={setShowAddExpenseModal}
      confirmBox={
        <ConfirmBox
          key="confirm"
          show={showConfirmBox}
          budgetId={budgetId}
          setShowConfirmBox={setShowConfirmBox}
        />
      }
      addBudgetModal={
        <AddBudgetModal
          show={showAddBudgetModal}
          setShowAddBudgetModal={setShowAddBudgetModal}
        />
      }
      addExpenseModal={
        <AddExpenseModal
          show={showAddExpenseModal}
          setShowAddExpenseModal={setShowAddExpenseModal}
          defaultBudgetId={budgetId}
        />
      }
      editBudgetModal={
        <EditBudgetModal
          show={showEditBudgetModal}
          setShowEditBudgetModal={setShowEditBudgetModal}
          budgetId={budgetId}
          name={budgetName}
          max={budgetMax}
        />
      }
    >
      <div className="grid grid-cols-fill gap-2 w-full md:px-10">
        {budgets[currYear][selectedMonth].expenses.length === 0 ? (
          <div className="flex flex-col items-center">
            <h2 className="text-center text-gray-100 text-xl mt-4">
              Você ainda não tem nenhuma despesa
            </h2>
          </div>
        ) : (
          <>
            <BudgetCard
              data={fixedExpenses}
              title={"Despesas Fixas"}
              amount={totalFixedAmount}
              showEditModal={handleEditBudgetModal}
              handleConfirmBox={handleConfirmDelete}
              textColor="text-gray-100"
            />
            <BudgetCard
              data={variableExpenses}
              title={"Despesas Variáveis"}
              amount={totalVariableAmount}
              showEditModal={handleEditBudgetModal}
              handleConfirmBox={handleConfirmDelete}
              textColor="text-gray-100"
            />

            <BudgetCard
              key="total"
              title="Total Geral"
              amount={totalAmounts || 0}
              max={totalAmounts || 0}
              textColor="text-gray-100"
              total
            />
          </>
        )}
      </div>
    </Container>
  );
}

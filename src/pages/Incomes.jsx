import { useEffect, useRef, useState } from "react";
import ConfirmBox from "../components/ConfirmBox";
import Container from "../components/Container";
import AddIncomeModal from "../components/incomes/AddIncomeModal";
import EditIncomeModal from "../components/incomes/EditIncomeModal";
import IncomeCard from "../components/incomes/IncomeCard";
import { useBudgets } from "../contexts/BudgetsContext";

export default function Incomes() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [incomeId, setIncomeId] = useState(false);
  const [incomeName, setIncomeName] = useState("");
  const [incomeValue, setIncomeValue] = useState(0);
  const [removed, setRemoved] = useState(false);
  const [showEditIncomeModal, setShowEditIncomeModal] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const { budgets, currYear, selectedMonth } = useBudgets();
  const [totalIncomes, setTotalIncomes] = useState(
    budgets[currYear][selectedMonth].totalIncomes
  );

  const ref = useRef();
  const totalUpdate = useRef();

  ref.current = () => {
    if (!showAddIncomeModal || !showEditIncomeModal || removed)
      setTotalIncomes(budgets[currYear][selectedMonth].totalIncomes);
  };

  totalUpdate.current = () => {
    setTotalIncomes(budgets[currYear][selectedMonth].totalIncomes);
  };

  useEffect(() => {
    ref.current();
  }, [showAddIncomeModal, showEditIncomeModal, removed]);

  useEffect(() => {
    totalUpdate.current();
  }, [selectedMonth]);

  const handleEditIncomeModal = (show, id, name, value) => {
    setShowEditIncomeModal(show);
    if (id === null) return;
    setIncomeId(id);
    setIncomeName(name);
    setIncomeValue(value);
  };

  const handleConfirmDelete = (id, value) => {
    setIncomeId(id);
    setShowConfirmBox(value);
  };

  return (
    <Container
      title="Receitas"
      page="Receitas"
      showIncomeModal={setShowAddIncomeModal}
      confirmBox={
        <ConfirmBox
          key="confirm"
          show={showConfirmBox}
          incomeId={incomeId}
          setShowConfirmBox={setShowConfirmBox}
          removed={setRemoved}
        />
      }
      addIncomeModal={
        <AddIncomeModal
          show={showAddIncomeModal}
          setShowAddIncomeModal={setShowAddIncomeModal}
          incomeId={incomeId}
        />
      }
      editIncomeModal={
        <EditIncomeModal
          show={showEditIncomeModal}
          setShowEditIncomeModal={setShowEditIncomeModal}
          incomeId={incomeId}
          name={incomeName}
          value={incomeValue}
        />
      }
    >
      <div className="grid grid-cols-fill gap-2 w-full md:px-10">
        {budgets[currYear][selectedMonth].incomes.length === 0 ? (
          <div className="flex flex-col items-center">
            <h2 className="text-center text-gray-100 text-xl mt-4">
              Você ainda não tem nenhuma receita
            </h2>
          </div>
        ) : (
          budgets[currYear][selectedMonth].incomes.map((income) => {
            return (
              <IncomeCard
                key={income.id}
                name={income.description}
                value={income.value}
                showEditModal={handleEditIncomeModal}
                setShowConfirmBox={setShowConfirmBox}
                handleConfirmBox={handleConfirmDelete}
                incomeId={income.id}
                textColor="text-gray-100"
              />
            );
          })
        )}
        {budgets[currYear][selectedMonth].incomes.length > 0 && (
          <IncomeCard
            key="total"
            name="Total"
            value={totalIncomes}
            textColor="text-gray-100"
            total
          />
        )}
      </div>
    </Container>
  );
}

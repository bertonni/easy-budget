/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

const monthlyBase = {
  incomes: [],
  expenses: [],
  totalIncomes: 0,
  totalExpenses: 0,
}

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const initialBudget = {
  2022: {},
};

for (let i = currentMonth; i <= 12; i++) {
  initialBudget[currentYear][i] = monthlyBase;
}

const initialCategories = [
  "Água",
  "Energia Elétrica",
  "Mercado",
  "Telefone",
  "Internet",
  "Farmácia",
  "Entretenimento",
  "Jogos",
].sort((a, b) => {
  return a.localeCompare(b);
});

const initialPaymentMethods = [
  "Dinheiro",
  "Cartão de Crédito",
  "Cartão de Débito"
];

export function BudgetsProvider({ children }) {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());

  const [budgets, setBudgets] = useLocalStorage("budgets", initialBudget);
  const [categories, setCategories] = useLocalStorage(
    "categories",
    initialCategories
  );
  const [paymentMethods, setPaymentMethods] = useLocalStorage(
    "paymentMethods",
    initialPaymentMethods
  );
  const [lastActivities, setLastActivities] = useLocalStorage("activities", []);
  const [selectedMonth, setSelectedMonth] = useLocalStorage("selectedMonth", currMonth);
  const [currentBudget, setCurrentBudget] = useState(budgets[currYear][selectedMonth]);

  const addCategory = (name) => {
    const newCategories = Array.from(categories);
    newCategories.push(name);
    newCategories.sort((a, b) => {
      return a.localeCompare(b);
    });
    setCategories(newCategories);
  };

  const addPaymentMethod = (name) => {
    const newPaymentMethods = Array.from(paymentMethods);
    newPaymentMethods.push(name);
    newPaymentMethods.sort((a, b) => {
      return a.localeCompare(b);
    });
    setPaymentMethods(newPaymentMethods);
  };

  const addIncome = ({ description, value }, repeat) => {

    let newIncome;
    const budgetsCopy = Object.assign({}, budgets);
    if (repeat) {
      for (let i = selectedMonth; i <= 12; i++) {
        const incomesCopy = Array.from(budgetsCopy[currYear][i]["incomes"]);
        newIncome = { id: uuidV4(), description, value };
        incomesCopy.push(newIncome);
        budgetsCopy[currYear][i].incomes = incomesCopy;
        budgetsCopy[currYear][i].totalIncomes += value;
      }
    } else {
      const incomesCopy = Array.from(budgets[currYear][selectedMonth]["incomes"]);
      newIncome = { id: uuidV4(), description, value };
      incomesCopy.push(newIncome);
      budgetsCopy[currYear][selectedMonth].incomes = incomesCopy;
      budgetsCopy[currYear][selectedMonth].totalIncomes += value;
    }

    setBudgets(budgetsCopy);
    setLastActivities((prevActivities) => [...prevActivities, newIncome]);
  };

  const updateIncome = (income) => {
    const incomeIndex = budgets[currYear][selectedMonth]["incomes"].findIndex(
      (inc) => inc.id === income.id
    );

    const budgetsCopy = Object.assign({}, budgets);

    if (incomeIndex >= 0) {
      budgetsCopy[currYear][selectedMonth].totalIncomes =
        budgetsCopy[currYear][selectedMonth].totalIncomes -
        budgetsCopy[currYear][selectedMonth].incomes[incomeIndex].value +
        income.value;
      budgetsCopy[currYear][selectedMonth].incomes[incomeIndex] = income;
      setBudgets(budgetsCopy);
    }
  };

  const deleteIncome = (incomeId) => {
    const budgetsCopy = {};
    const deletedIncome = budgets[currYear][selectedMonth].incomes.filter(
      (income) => income.id === incomeId
    )[0];

    Object.assign(budgetsCopy, budgets);
    const incomesCopy = budgetsCopy[currYear][selectedMonth].incomes.filter(
      (income) => income.id !== incomeId
    );

    budgetsCopy[currYear][selectedMonth].incomes = incomesCopy;
    budgetsCopy[currYear][selectedMonth].totalIncomes -= deletedIncome.value;
    setBudgets(budgetsCopy);
  };

  const addExpense = (newExpense) => {
    const budgetsCopy = Object.assign({}, budgets);
    
    const current = parseInt(newExpense.installments.current);
    const total = parseInt(newExpense.installments.total);

    if (current < total) {
      let initialInstallment = current;
      let updatableMonth = parseInt(selectedMonth);
      for (let i = current; i <= total; i++) {
        const currentExpenseCopy = Array.from(budgetsCopy[currYear][updatableMonth].expenses);
        const expenseCopy = Object.assign({}, { id: uuidV4(), ...newExpense });
        expenseCopy.installments = Object.assign({}, newExpense.installments);
        expenseCopy.amount = parseFloat((newExpense.amount / total));
        expenseCopy.installments.current = initialInstallment;
        initialInstallment++;
        
        currentExpenseCopy.push(expenseCopy);
        budgetsCopy[currYear][updatableMonth].expenses = currentExpenseCopy;
        budgetsCopy[currYear][updatableMonth].totalExpenses += parseFloat((newExpense.amount / total));
        updatableMonth++;
      }
    } else {
      const expensesCopy = Array.from(budgets[currYear][selectedMonth].expenses);
      expensesCopy.push({ id: uuidV4(), ...newExpense })
      budgetsCopy[currYear][selectedMonth].totalExpenses += newExpense.amount;
      budgetsCopy[currYear][selectedMonth].expenses = expensesCopy;
    }

    setBudgets(budgetsCopy);
    // setLastActivities((prevActivities) => [...prevActivities, newExpenseBase]);
  };

  const getFixedExpenses = () => {
    const fixed = budgets[currYear][selectedMonth].expenses.filter(
      (expense) => expense.type === "fixed"
    );
    return Array.from(fixed);
  };

  const getVariableExpenses = () => {
    const variable = budgets[currYear][selectedMonth].expenses.filter(
      (expense) => expense.type === "variable"
    );
    return Array.from(variable);
  };

  const memoedValues = useMemo(
    () => ({
      budgets,
      currentBudget,
      categories,
      lastActivities,
      currMonth,
      currYear,
      paymentMethods,
      selectedMonth,
      setSelectedMonth,
      setCurrentBudget,
      addPaymentMethod,
      setCurrMonth,
      setCurrYear,
      getFixedExpenses,
      getVariableExpenses,
      addCategory,
      addExpense,
      addIncome,
      updateIncome,
      deleteIncome,
    }),
    [budgets, categories, paymentMethods, selectedMonth, currentBudget]
  );

  return (
    <BudgetsContext.Provider value={memoedValues}>
      {children}
    </BudgetsContext.Provider>
  );
}

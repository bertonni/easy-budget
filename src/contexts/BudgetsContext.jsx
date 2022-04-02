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
  balance: 0
}

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const initialBudget = {
  2022: {},
};

for (let index = currentMonth; index <= 12; index++) {
  initialBudget[currentYear][index] = monthlyBase;
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

  const addIncome = ({ description, value }) => {
    const incomesCopy = Array.from(budgets[currYear][currMonth]["incomes"]);
    const newIncome = { id: uuidV4(), description, value };
    incomesCopy.push(newIncome);
    const budgetsCopy = Object.assign({}, budgets);

    budgetsCopy[currYear][currMonth].incomes = incomesCopy;
    budgetsCopy[currYear][currMonth].totalIncomes += value;

    setBudgets(budgetsCopy);
    setLastActivities((prevActivities) => [...prevActivities, newIncome]);
  };

  const updateIncome = (income) => {
    const incomeIndex = budgets[currYear][currMonth]["incomes"].findIndex(
      (inc) => inc.id === income.id
    );
    const budgetsCopy = Object.assign({}, budgets);

    if (incomeIndex >= 0) {
      budgetsCopy[currYear][currMonth].totalIncomes =
        budgetsCopy[currYear][currMonth].totalIncomes -
        budgetsCopy[currYear][currMonth].incomes[incomeIndex].value +
        income.value;
      budgetsCopy[currYear][currMonth].incomes[incomeIndex] = income;
      setBudgets(budgetsCopy);
    }
  };

  const deleteIncome = (incomeId) => {
    const budgetsCopy = {};
    const deletedIncome = budgets[currYear][currMonth].incomes.filter(
      (income) => income.id === incomeId
    )[0];

    Object.assign(budgetsCopy, budgets);
    const incomesCopy = budgetsCopy[currYear][currMonth].incomes.filter(
      (income) => income.id !== incomeId
    );

    budgetsCopy[currYear][currMonth].incomes = incomesCopy;
    budgetsCopy[currYear][currMonth].totalIncomes -= deletedIncome.value;
    setBudgets(budgetsCopy);
  };

  const addExpense = (newExpense) => {
    const newExpenseBase = { id: uuidV4(), ...newExpense };
    const expensesCopy = Array.from(budgets[currYear][currMonth].expenses);
    const budgetsCopy = Object.assign({}, budgets);

    
    const current = parseInt(newExpense.installments.current);
    const total = parseInt(newExpense.installments.total);

    if (current < total) {
      for (let i = currMonth; i <= (currMonth + total - current); i++) {
        
        const newExpenseCopy = Object.assign({}, newExpense);
        newExpenseCopy.installments = Object.assign({}, newExpense.installments);
        newExpenseCopy.amount = parseFloat((newExpense.amount / total));
        newExpenseCopy.installments.current = i;

        budgetsCopy[currYear][i].expenses.push(newExpenseCopy);
      }
    }

    budgetsCopy[currYear][currMonth].totalExpenses += newExpense.amount;
    budgetsCopy[currYear][currMonth].expenses = expensesCopy;

    setBudgets(budgetsCopy);
    setLastActivities((prevActivities) => [...prevActivities, newExpenseBase]);
  };

  const getFixedExpenses = () => {
    const fixed = budgets[currYear][currMonth].expenses.filter(
      (expense) => expense.type === "fixed"
    );
    return Array.from(fixed);
  };

  const getVariableExpenses = () => {
    const variable = budgets[currYear][currMonth].expenses.filter(
      (expense) => expense.type === "variable"
    );
    return Array.from(variable);
  };

  const memoedValues = useMemo(
    () => ({
      budgets,
      categories,
      lastActivities,
      currMonth,
      currYear,
      paymentMethods,
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
    [budgets, categories, paymentMethods]
  );

  return (
    <BudgetsContext.Provider value={memoedValues}>
      {children}
    </BudgetsContext.Provider>
  );
}

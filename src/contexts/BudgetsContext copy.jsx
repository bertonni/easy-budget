/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

const initialIncomes = {
  2022: {
    currentMonth: []
  }
}

const initialExpenses = {
  2022: {
    currentMonth: {
      fixed: [],
      variable: []
    }
  }
}

const initialBudget = {
  2022: {
    currentMonth: {
      incomes: [],
      fixedExpenses: [],
      variableExpenses: [],
      totalIncomes: 0,
      totalExpenses: 0,
      balance: 0,
    },
  },
};

const initialCategories = [
  "Água",
  "Mercado",
  "Luz",
  "Telefone",
  "Internet",
  "Farmácia",
  "Entretenimento",
  "Jogos",
  "Cartão",
].sort((a, b) => {
  return a.localeCompare(b);
});

export function BudgetsProvider({ children }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [budgets, setBudgets] = useLocalStorage("budgets", initialBudget);
  const [currentBudget, setCurrentBudget] = useLocalStorage(
    "currentBudget",
    budgets[new Date().getFullYear()][currentMonth]
  );
  const [expenses, setExpenses] = useLocalStorage("expenses", initialExpenses);
  const [incomes, setIncomes] = useLocalStorage("incomes", initialIncomes);
  const [categories, setCategories] = useLocalStorage(
    "categories",
    initialCategories
  );
  const [lastActivities, setLastActivities] = useLocalStorage("activities", []);

  function addCategory(name) {
    const newCategories = Array.from(categories);
    newCategories.push(name);
    newCategories.sort((a, b) => {
      return a.localeCompare(b);
    });
    setCategories(newCategories);
  }

  function addIncome({ description, value }) {
    setIncomes((prevIncomes) => {
      return [...prevIncomes, { id: uuidV4(), description, value }];
    });
  }

  function updateIncome(income) {
    const incomeIndex = incomes.findIndex((bd) => bd.id === income.id);
    const incomesCopy = Array.from(incomes);

    if (incomeIndex >= 0) {
      incomesCopy[incomeIndex] = income;
      setIncomes(incomesCopy);
    }
  }

  function deleteIncome(id) {
    setIncomes((prevIncomes) => {
      return prevIncomes.filter((income) => income.id !== id);
    });
  }

  function getTotalIncomes() {
    return currentBudget.currentYear.currentMonth.totalIncomes;
  }

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function getAllExpenses() {
    const amounts = budgets.map(({ id }) =>
      expenses.length > 0
        ? getBudgetExpenses(id).reduce(
            (total, expense) => total + expense.amount,
            0
          )
        : 0
    );
    const max =
      budgets.length > 0
        ? budgets.reduce((total, budget) => total + budget.max, 0)
        : 0;
    return [amounts, max];
  }

  function addExpense({ description, date, installments, amount, budgetId }) {
    setLastActivities((prevActivities) => [
      ...prevActivities,
      { description, date, installments, amount },
    ]);
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidV4(), description, date, installments, amount, budgetId },
      ];
    });
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function updateBudget(budget) {
    const budgetIndex = budgets.findIndex((bd) => bd.id === budget.id);
    const budgetsCopy = Array.from(budgets);

    if (budgetIndex >= 0) {
      budgetsCopy[budgetIndex] = budget;
      setBudgets(budgetsCopy);
    }
  }

  function deleteBudget(id) {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  const memoedValues = useMemo(
    () => ({
      budgets,
      incomes,
      expenses,
      categories,
      currentBudget,
      lastActivities,
      currentMonth,
      setCurrentMonth,
      setCurrentBudget,
      getBudgetExpenses,
      getAllExpenses,
      addExpense,
      addBudget,
      addIncome,
      updateIncome,
      deleteIncome,
      getTotalIncomes,
      deleteBudget,
      updateBudget,
      deleteExpense,
      addCategory
    }),
    [budgets, incomes, expenses, categories, currentBudget]
  );

  return (
    <BudgetsContext.Provider value={memoedValues}>
      {children}
    </BudgetsContext.Provider>
  );
}

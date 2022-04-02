import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudgets } from '../../contexts/BudgetsContext';
import { currencyFormatter } from '../../utils';

export default function MainIncomeCard({ disabled }) {
  const { budgets, currYear, currMonth } = useBudgets();

  const [totalIncomes] = useState(budgets[currYear][currMonth].totalIncomes);
  const isDisabled = disabled ? 'pointer-events-none' : '';
  const bgColor = disabled ? 'from-gray-500 to-slate-500' : 'from-gray-600 to-slate-600';

  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`w-full sm:w-1/2 px-5 pb-3 pt-1 border border-gray-200 rounded
        flex flex-col hover:bg-opacity-70 relative bg-gradient-to-r ${bgColor} h-32 justify-between cursor-pointer ${isDisabled}`}
      onClick={() => navigate("/incomes")}
    >
      <h1 className={`text-2xl self-start ${disabled ? 'text-gray-300' : 'text-white'}`}>Receitas</h1>
      <h1 className={`text-4xl self-end ${disabled ? 'text-gray-300' : 'text-white'}`}>{currencyFormatter.format(totalIncomes)}</h1>
    </motion.div>
  );
}

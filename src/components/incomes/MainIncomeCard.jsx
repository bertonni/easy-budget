import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudgets } from '../../contexts/BudgetsContext';
import { currencyFormatter } from '../../utils';

export default function MainIncomeCard() {
  const { budgets, currYear, currMonth } = useBudgets();
  const [totalIncomes] = useState(budgets[currYear][currMonth].totalIncomes);

  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className='w-full sm:w-1/2 px-5 pb-3 pt-1 border border-gray-200 rounded
        flex flex-col hover:bg-opacity-70 relative bg-gradient-to-r from-sky-500
        to-indigo-500 h-32 justify-between cursor-pointer'
      onClick={() => navigate("/incomes")}
    >
      <h1 className='text-2xl text-white self-start'>Receitas</h1>
      <h1 className='text-4xl text-white self-end'>{currencyFormatter.format(totalIncomes)}</h1>
    </motion.div>
  );
}

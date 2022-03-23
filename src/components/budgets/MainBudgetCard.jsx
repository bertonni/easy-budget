import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudgets } from '../../contexts/BudgetsContext';
import { currencyFormatter } from '../../utils';
import { motion } from 'framer-motion';

export default function MainBudgetCard() {
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const { budgets, currYear, currMonth } = useBudgets();

  const ref = useRef();

  ref.current = () => {
    setTotalAmount(budgets[currYear][currMonth].totalExpenses);
  }

  useEffect(() => {
    ref.current();
  }, []);
  

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className='w-full sm:w-1/2 px-5 pb-3 pt-1 border border-gray-200 rounded
        flex flex-col hover:bg-opacity-70 relative bg-gradient-to-r from-violet-500 
        to-fuchsia-500 h-32 justify-between cursor-pointer'
      onClick={() => navigate("/budgets")}
    >
      <h1 className='text-2xl text-white self-start'>Despesas</h1>
      <h1 className='text-4xl text-white self-end'>{currencyFormatter.format(totalAmount)}</h1>
    </motion.div>
  );
}

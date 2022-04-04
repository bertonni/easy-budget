import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudgets } from '../../contexts/BudgetsContext';
import { currencyFormatter } from '../../utils';
import { motion } from 'framer-motion';

export default function MainBudgetCard({ disabled }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const { currentBudget } = useBudgets();

  const ref = useRef();
  const isDisabled = disabled ? 'pointer-events-none' : '';
  const bgColor = disabled ? 'from-gray-500 to-slate-500' : 'from-zinc-600 to-gray-600';


  ref.current = () => {
    setTotalAmount(currentBudget.totalExpenses);
  }

  useEffect(() => {
    ref.current();
  }, []);
  

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`w-full sm:w-1/2 px-5 pb-3 pt-1 border border-gray-200 rounded
        flex flex-col hover:bg-opacity-70 relative bg-gradient-to-r ${bgColor} h-32 justify-between cursor-pointer ${isDisabled}`}
      onClick={() => navigate("/budgets")}
    >
      <h1 className={`text-2xl self-start ${disabled ? 'text-gray-300' : 'text-white'}`}>Despesas</h1>
      <h1 className={`text-4xl self-end ${disabled ? 'text-gray-300' : 'text-white'}`}>{currencyFormatter.format(totalAmount)}</h1>
    </motion.div>
  );
}

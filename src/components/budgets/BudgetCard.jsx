/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { currencyFormatter } from "../../utils";
import ProgressBar from "./ProgressBar";
import AddExpenseButton from './AddExpenseButton';
import ViewExpenseButton from './ViewExpenseButton';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const editVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

const deleteVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.1, } }
}

export default function BudgetCard({
  variant,
  title,
  data,
  name,
  amount,
  max,
  showEditModal,
  showExpenseModal,
  showViewExpensesModal,
  handleConfirmBox,
  budgetId,
  textColor = "text-gray-100",
  maxTextColor = "text-gray-200",
  noProgressBar,
  total
}) {

  const { width } = useWindowDimensions();
  const [percent, setPercent] = useState(0);
  const [showExpenseDetails, setShowExpenseDetails] = useState(0);
  const [showOptions, setShowOptions] = useState(width <= 460);

  const classNames = `${amount > max ? 'bg-gradient-to-r from-red-300 to-pink-300 text-gray-100' :
  'bg-gradient-to-r from-gray-500 to-gray-700 text-gray-100'} backdrop-blur-md w-full px-5 pb-5
  pt-8 border border-gray-400 rounded hover:bg-opacity-70 relative`;

  useEffect(() => {
    getPercentage(amount, max);
  }, [amount, max]);

  function getPercentage(amount, max) {
    setPercent((amount * 100) / max);
  }

  function handleConfirmDelete(id) {
    handleConfirmBox(id, true);
  }

  return (
    <motion.div
      variants={variant}
      className={classNames}
      onMouseOver={width > 460 ? () => setShowOptions(true) : () => ''}
      onMouseLeave={width > 460 ? () => setShowOptions(false) : () => ''}
    >
      <AnimatePresence>
        {showOptions && !total && (
          <div
            className="flex items-center justify-end absolute top-2 right-5 transition-all
            gap-2"
          >
            <motion.span
              key="edit"
              className='cursor-pointer text-sm font-bold text-gray-500 hover:text-gray-700'
              onClick={() => showEditModal(true, budgetId, name, max)}
              variants={editVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { delay: 0.1 } }}
            ><FontAwesomeIcon className='text-sky-300 hover:opacity-70 p-1' icon="edit" /></motion.span>
            <motion.span
              key="delete"
              className='cursor-pointer text-sm font-bold text-gray-500 hover:text-gray-700'
              onClick={() => handleConfirmDelete(budgetId)}
              variants={deleteVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            ><FontAwesomeIcon className='text-pink-500 hover:opacity-70 p-1' icon="trash" /></motion.span>
          </div>
        )}
      </AnimatePresence>
      <div className={`flex flex-col justify-between h-10 ${textColor}`}>
        <h2 className="text-xl md:text-2xl -mt-6 font-bold">{title}</h2>
        <h2 className="text-lg md:text-xl">{currencyFormatter.format(amount)}</h2>
      </div>
      {!total && <div className='flex items-center justify-end'>
        <button
          onClick={() => showViewExpensesModal(true, budgetId, title)}
          className="py-1 px-3 bg-gradient-to-r from-emerald-500 border to-teal-500 border-emerald-500
            text-white flex items-center gap-2 rounded hover:opacity-70 hover:border-emerald-400 
            min-w-32 transition-all justify-center uppercase"
        ><FontAwesomeIcon icon="eye" /> Detalhar</button>
      </div>}
      {/* { !noProgressBar && <ProgressBar percentage={percent} /> } */}
      {/* {
        !total &&
        <div className="w-full flex items-center justify-end gap-2 mt-6">
          <AddExpenseButton show={showExpenseModal} id={budgetId} />
          <ViewExpenseButton
            viewExpensesModal={showViewExpensesModal}
            budgetId={budgetId}
            name={name}
          />
        </div>
      } */}
    </motion.div>
  )
}
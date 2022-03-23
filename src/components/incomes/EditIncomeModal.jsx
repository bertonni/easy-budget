import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useBudgets } from '../../contexts/BudgetsContext';
import Input from '../Input';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const modal = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 50, opacity: 1 },
  transition: { duration: 0.3, type: "just" }
}

export default function EditIncomeModal({ show, setShowEditIncomeModal, incomeId, name, value }) {

  const descriptionRef = useRef();
  const valueRef = useRef();
  const [valueError, setValueError] = useState(false);

  const { updateIncome } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    const regEx = /^([0-9]+(\.|,)?[0-9]{0,2})+$/;
    const description = descriptionRef.current.value;
    const value = valueRef.current.value;
    
    setValueError(false);

    if (!value.match(regEx)) {
      setValueError(true);
      return;
    }

    const updatedIncome = { id: incomeId, description, value: parseFloat(value) };
    updateIncome(updatedIncome);
    setShowEditIncomeModal(false);
  }

  function handleStopPropagation(e) {
    e.stopPropagation();  
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10
            flex justify-center items-start'
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={() => setShowEditIncomeModal(false)}
        >
          <motion.div
            className='relative w-full sm:max-w-sm md:max-w-md my-0 mx-5 md:mx-10 py-5 px-5
              bg-white max-h-80 flex flex-col justify-center gap-2 z-40 rounded text-gray-600'
            variants={modal}
            transition="transition"
            onMouseDown={(e) => handleStopPropagation(e)}
          >
            <span
              onMouseDown={() => setShowEditIncomeModal(false)}
              className='h-5 w-5 p-3 absolute top-1 right-1 z-50 hover:opacity-70
              hover:cursor-pointer flex items-center justify-center'
            ><FontAwesomeIcon icon="times" /></span>
            <h1 className='text-xl font-bold text-left'>Editar Receita</h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className='flex flex-col gap-2'
            >
              <Input
                id="description"
                customRef={descriptionRef}
                placeholder="Nome"
                defaultValue={name}
                label="Nome"
              />
              <Input
                id="value"
                type="number"
                customRef={valueRef}
                placeholder="Valor"
                label="Valor"
                step={0.01}
                defaultValue={value}
                error={valueError}
                errorMessage="Por favor, insira um número válido"
              />
              <button
                type='submit'
                className='bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 rounded
                text-white min-w-min w-20 self-end hover:opacity-70 transition-all'
              >Salvar</button>
            </form>
          </motion.div>
        </motion.div>
      )
      }
    </AnimatePresence>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { currencyFormatter } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const editVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const deleteVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
};

export default function IncomeCard({
  name,
  value,
  showEditModal,
  incomeId,
  handleConfirmBox,
  textColor,
  total,
}) {
  const { width } = useWindowDimensions();
  const [showOptions, setShowOptions] = useState(width <= 460);

  const classNames = `w-full px-5 pb-5 pt-4 border border-gray-400 rounded
    hover:bg-opacity-70 relative bg-gradient-to-r from-gray-500 to-gray-700
    text-gray-100 backdrop-blur-md`;

  function handleConfirmDelete(id) {
    handleConfirmBox(id, true);
  }

  return (
    <motion.div
      className={classNames}
      onMouseOver={width > 460 ? () => setShowOptions(true) : () => ""}
      onMouseLeave={width > 460 ? () => setShowOptions(false) : () => ""}
    >
      <AnimatePresence>
        {showOptions && !total && (
          <div
            className="flex items-center justify-end absolute top-2 right-5
              transition-all gap-2 z-10"
          >
            <motion.span
              key="edit"
              className="cursor-pointer text-sm font-bold"
              onClick={() => showEditModal(true, incomeId, name, value)}
              variants={editVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { delay: 0.1 } }}
            >
              <FontAwesomeIcon
                className="text-sky-300 hover:opacity-70 p-1"
                icon="edit"
              />
            </motion.span>
            <motion.span
              key="delete"
              className="cursor-pointer text-sm font-bold"
              onClick={() => handleConfirmDelete(incomeId)}
              variants={deleteVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <FontAwesomeIcon
                className="text-pink-500 hover:opacity-70 p-1"
                icon="trash"
              />
            </motion.span>
          </div>
        )}
      </AnimatePresence>
      <div
        className={`w-full rounded flex flex-col hover:bg-opacity-70
        relative h-20 justify-between ${textColor}`}
      >
        <h1 className="text-2xl self-start font-bold text-gray-100">
          {name}
        </h1>
        <h1 className="text-3xl self-end">{currencyFormatter.format(value)}</h1>
      </div>
    </motion.div>
  );
}

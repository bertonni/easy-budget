import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MenuTop({ page }) {

  return (
    <ul
      className="flex items-center h-12 justify-center bg-gradient-to-r
      from-gray-600 to-gray-700 w-full"
    >
      <li
        className={`justify-center relative
        text-white cursor-pointer h-full flex-grow flex items-center`}
      >
        {page === "Atividades" ? (
          <>
            <span>Atividades</span>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"
              layoutId="underline"
            />
          </>
        ) : (
          <Link to="/activities" className="text-center w-full h-full flex items-center justify-center">
            Atividades
          </Link>
        )}
      </li>
      <li
        className={`justify-center relative
         text-white cursor-pointer h-full flex-grow flex items-center`}
      >
        {page === "Receitas" ? (
          <>
            <span>Receitas</span>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"
              layoutId="underline"
            />
          </>
        ) : (
          <Link to="/incomes" className="text-center w-full h-full flex items-center justify-center">
            Receitas
          </Link>
        )}
      </li>
      <li
        className={`justify-center relative
         text-white cursor-pointer h-full flex-grow flex items-center`}
      >
        {page === "Despesas" ? (
          <>
            <span>Despesas</span>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"
              layoutId="underline"
            />
          </>
        ) : (
          <Link to="/budgets" className="text-center w-full h-full flex items-center justify-center">
            Despesas
          </Link>
        )}
      </li>
    </ul>
  );
}

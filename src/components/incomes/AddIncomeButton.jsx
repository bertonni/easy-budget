import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function AddIncomeButton({ show }) {
  return (
    <button
      onClick={() => show(true)}
      className="py-1 px-3 bg-gradient-to-r from-emerald-500 border to-teal-500 border-emerald-500
    text-white flex items-center gap-2 rounded hover:opacity-70 hover:border-emerald-400 
      min-w-32 transition-all justify-center uppercase"
    >
      <FontAwesomeIcon icon="plus" /> Receita
    </button>
  );
}

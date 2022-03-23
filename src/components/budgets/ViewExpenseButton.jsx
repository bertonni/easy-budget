export default function ViewExpenseButton({ viewExpensesModal, budgetId, name }) {
  return (
    <button
      onClick={() => viewExpensesModal(true, budgetId, name)}
      className="py-1 px-3 bg-white border-gray-400 text-gray-400 
        border rounded hover:bg-gray-400 hover:text-white transition-all uppercase"
    >Ver Despesas</button>
  )
}

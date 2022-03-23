
export default function CloseButton({ close }) {
  return (
    <button
      type="button"
      onClick={() => close()}
      className="py-1 px-3 bg-gradient-to-r from-red-500 border to-pink-500 border-red-500
      text-white flex items-center gap-2 rounded hover:opacity-70 hover:border-red-400 
      min-w-32 transition-all justify-center uppercase"
    >
      Fechar
    </button>
  );
}

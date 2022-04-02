import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../components/Container";
import MainBudgetCard from "../components/budgets/MainBudgetCard";
import MainIncomeCard from "../components/incomes/MainIncomeCard";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { login, logout, user } = useAuth();
  const [disabled, setDisabled] = useState(user ? false : true);

  useEffect(() => {
    setDisabled(user ? false : true);
  }, [user]);

  return (
    <Container title={"Controle de Despesas"} page="Home">
      <div className="flex flex-col items-center justify-center gap-3 w-full mt-8">
        <MainIncomeCard disabled={disabled} />
        <MainBudgetCard disabled={disabled} />
        {!user ? (
          <>
            <button
              className="flex items-center justify-center gap-3 px-4 w-40 py-2 text-lg rounded bg-sky-500 text-gray-50 font-medium
            hover:bg-sky-600 transition-all mt-20"
              onClick={() => login()}
            >
              ENTRAR
              <FontAwesomeIcon
                icon={["fab", "google"]}
                className="text-gray-50"
              />
            </button>
            <h2 className="text-white text-lg mt-10">Você precisa fazer o login para utilizar o sistema.</h2>
          </>
        ) : (
          <button
            className="flex items-center justify-center gap-3 px-4 w-40 py-2 text-lg rounded bg-pink-500 text-gray-50 font-medium
          hover:bg-pink-600 transition-all mt-20"
            onClick={() => logout()}
          >
            Sair
          </button>
        )}
      </div>
    </Container>
  );
}

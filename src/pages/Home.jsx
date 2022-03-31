import MainBudgetCard from "../components/budgets/MainBudgetCard";
import Container from "../components/Container";
import MainIncomeCard from "../components/incomes/MainIncomeCard";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { login, logout, user } = useAuth();

  return (
    <Container title={"Controle de Despesas"} page="Home">
      <div className="flex flex-col items-center justify-center gap-3 w-full mt-8">
        <MainIncomeCard />
        <MainBudgetCard />
        {!user ? (
          <button onClick={() => login()}>
            Entrar com Google
          </button>
          ) : (
          <button onClick={() => logout()}>
            Sair
          </button>)
        }
      </div>
    </Container>
  );
}

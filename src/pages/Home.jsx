import MainBudgetCard from "../components/budgets/MainBudgetCard";
import Container from "../components/Container";
import MainIncomeCard from "../components/incomes/MainIncomeCard";

export default function Home() {
  return (
    <Container title={"Controle de Despesas"} page="Home">
      <div className="flex flex-col items-center justify-center gap-3 w-full mt-8">
        <MainIncomeCard />
        <MainBudgetCard />
      </div>
    </Container>
  );
}

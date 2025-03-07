import { useSelector } from "react-redux";
import "./App.css";
import Step_1 from "./components/Step_1";
import Step_2 from "./components/Step_2";
import Step_3 from "./components/Step_3";
import Step_4 from "./components/Step_4";
import Step_5 from "./components/Step_5";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {
  const { steps } = useSelector((store) => store.reducer);
  return (
    <>
      {steps == 1 && <Step_1 />}
      {steps == 2 && <Step_2 />}
      {steps == 3 && <Step_3 />}
      {steps == 4 && <Step_4 />}
      {steps == 5 && <Step_5 />}
      {steps == 6 && <ConfirmationPage />}
    </>
  );
}

export default App;

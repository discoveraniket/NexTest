import { ExamProvider } from './context/ExamContext';
import { ExamTerminal } from './pages/ExamTerminal';

function App() {
  return (
    <ExamProvider>
      <ExamTerminal />
    </ExamProvider>
  );
}

export default App;

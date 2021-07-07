import logo from './logo.svg';
import './App.css';
import Record from './components/Record/Record';
import SingleQuestion from './components/SingleQuestion/SingleQuestion';
import MultipleQuestion from './components/MultipleQuestion/MultipleQuestion';
import FreeQuestion from './components/FreeQuestion/FreeQuestion';
import SortQuestion from './components/SortQuestion/SortQuestion';
import FillQuestion from './components/FillQuestion/FillQuestion';
import MatrixQuestion from './components/MatrixQuestion/MatrixQuestion';
import OpenAnswer from './components/OpenAnswer/OpenAnswer';

function App() {
  return (
    <div className="App">
      <SingleQuestion />
      <MultipleQuestion />
      <FreeQuestion />
      <SortQuestion />
      <FillQuestion />
      <MatrixQuestion />
      <OpenAnswer />
    </div>
  );
}

export default App;

import { ListItem } from "./components";

function App() {
  return (
    <table>
      <ListItem id={0} firstName='Matheus' lastName='Costa' year='2019-04-05'/>
      <ListItem id={1} firstName='Matheus' lastName='Costa' year='2019-04-05'/>
      <ListItem id={2} firstName='Matheus' lastName='Costa' year='2019-04-05'/>
    </table>
  );
}

export default App;

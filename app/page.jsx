
import HomePage from "./components/HomePage";
import DataProvider from "./store/dataProvider";


export default function Home() {
  return (
    <DataProvider>
      <HomePage/>
    </DataProvider>
  );
}

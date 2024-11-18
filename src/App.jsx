import Footer from "./Footer";
import Header from "./Header";
import Herosection from "./HeroSection";
import TaskBoard from "./task/TaskBoard";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Herosection />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}

export default App;

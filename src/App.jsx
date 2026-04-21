import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Header />
          <main className="app-main">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

import Header from "../widgets/Header/Header";
import Container from "../shared/ui/Container/Container";
import HomePage from "../pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardPage from "../pages/CountryDetails/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:countryCode" element={<CardPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

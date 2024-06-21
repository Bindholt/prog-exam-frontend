import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Athlete from "./containers/athlete/Athlete"
import Disciplines from "./containers/discipline/Disciplines"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/athlete" element={<Athlete/>} />
        <Route path="/discipline" element={<Disciplines/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

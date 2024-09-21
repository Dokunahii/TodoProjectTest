import "bootstrap/dist/css/bootstrap.min.css";
import AddTodos from "./components/AddTodos";
import { useLocalStorage } from "@uidotdev/usehooks";
import TodoContext from "./contexts/TodoContext";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Nav, Navbar } from "react-bootstrap";
import EditTodo from "./components/EditTodo";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import AccountContext from "./contexts/AccountContext";
import CurrentAccountContext from "./contexts/CurrentAccountContext";
import { useState } from "react";

function Layout() {
  return(
    <>
      <Navbar>
        <Navbar.Brand href='/'>Log Out</Navbar.Brand>
        <Nav>
          <Nav.Link href='/home'>Home</Nav.Link>
          <Nav.Link href='/add'>Add Todo</Nav.Link>
        </Nav>
      </Navbar>
      <Outlet/>
    </>
  )
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos",[])
  const [accounts, setAccounts] = useLocalStorage("accounts",[])
  const [currentAccount, setCurrentAccount] = useLocalStorage("currentAccount", null)
  return (
    <CurrentAccountContext.Provider value={{currentAccount,setCurrentAccount}}>
      <AccountContext.Provider value={{accounts,setAccounts}}>
        <TodoContext.Provider value={{todos, setTodos}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Login />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/add" element={<AddTodos />}/>
                <Route path="/edit/:id" element={<EditTodo />}/>
                <Route path="*" element={<ErrorPage/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </TodoContext.Provider>
      </AccountContext.Provider>
    </CurrentAccountContext.Provider>
  )
}

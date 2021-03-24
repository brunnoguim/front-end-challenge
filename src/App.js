import './Global.css';
import LoginProvider from './contexts/LoginContext'
import { Route, Switch, BrowserRouter} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import React from "react"

function App() {

  return (
    <LoginProvider>
      <BrowserRouter>
        <div className="app-container">
          <Switch>
            <Route path={"/"} exact component={LoginPage} />
            <Route path={"/dashboard"} exact component={DashboardPage} />
            <Route path={"/createnaver"} exact component={CreatePage} />
            <Route path={"/editnaver"} exact component={EditPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
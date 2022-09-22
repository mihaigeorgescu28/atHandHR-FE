import React, { FC } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.scss";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Forms from "./pages/Forms";
import BasicTables from "./pages/Tables/BasicTables";
import DataTable from "./pages/Tables/DataTable";
import Accordions from "./pages/UIComponents/Accordions";
import Alerts from "./pages/UIComponents/Alerts";
import Badges from "./pages/UIComponents/Badges";
import ButtonGroups from "./pages/UIComponents/ButtonGroups";
import Buttons from "./pages/UIComponents/Buttons";
import Cards from "./pages/UIComponents/Cards";
import Carousels from "./pages/UIComponents/Carousels";
import Dropdowns from "./pages/UIComponents/Dropdowns";
import ListGroups from "./pages/UIComponents/ListGroups";
import Modals from "./pages/UIComponents/Modals";
import Navbars from "./pages/UIComponents/Navbars";
import Navs from "./pages/UIComponents/Navs";
import Paginations from "./pages/UIComponents/Paginations";
import Progresses from "./pages/UIComponents/Progresses";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tables/basic-tables" element={<BasicTables />} />
          <Route path="/tables/data-table" element={<DataTable />} />
          <Route path="/ui-components/buttons" element={<Buttons />} />
          <Route path="/ui-components/dropdowns" element={<Dropdowns />} />
          <Route path="/ui-components/accordions" element={<Accordions />} />
          <Route path="/ui-components/alerts" element={<Alerts />} />
          <Route path="/ui-components/badges" element={<Badges />} />
          <Route path="/ui-components/carousels" element={<Carousels />} />
          <Route path="/ui-components/listgroups" element={<ListGroups />} />
          <Route path="/ui-components/modals" element={<Modals />} />
          <Route path="/ui-components/progresses" element={<Progresses />} />
          <Route path="/ui-components/buttongroups" element={<ButtonGroups />} />
          <Route path="/ui-components/cards" element={<Cards />} />
          <Route path="/ui-components/navs" element={<Navs />} />
          <Route path="/ui-components/navbars" element={<Navbars />} />
          <Route path="/ui-components/paginations" element={<Paginations />} />
          <Route path="/forms" element={<Forms />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

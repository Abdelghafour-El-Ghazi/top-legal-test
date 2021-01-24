import React, { useState } from "react";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Commit from "./pages/Commit";

const App = () => {
  const [cursor, setCursor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpage, setTotalPage] = useState(10);
  // we need to keep track of
  // the cursor
  // the currentPage
  // the totalpage
  // when switching between the commit and home page
  // as they are part of  the skip condition in the queries

  return (
    <Router>
      <AppBar />
      <Route
        exact
        path='/'
        render={() => (
          <Home
            cursor={cursor}
            setCursor={setCursor}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalpage={totalpage}
            setTotalPage={setTotalPage}
          />
        )}
      />
      <Route exact path='/commit/:id' component={Commit} />
    </Router>
  );
};

export default App;

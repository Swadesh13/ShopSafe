import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./components/sidebar";
import Shops from "./components/shops";

function App() {
  return (
    <div style={{ flexGrow: 1, marginTop: 40 }}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="baseline"
        spacing={3}
        xs={10}
      >
        <Grid container xs={4}>
          <Sidebar />
        </Grid>
        <Grid container xs={8}>
          <Shops />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

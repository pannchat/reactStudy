import React from "react";
import "./App.scss";
import Button from "./components/Button";
function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large">button</Button>
        <Button>button</Button>
        <Button size="small">button</Button>
      </div>
      <div className="buttons">
        <Button size="large" color="pink">
          button
        </Button>
        <Button color="pink">button</Button>
        <Button size="small" color="pink">
          button
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="gray">
          button
        </Button>
        <Button color="gray">button</Button>
        <Button size="small" color="gray">
          button
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" outline={true}>
          button
        </Button>
        <Button color="gray" outline={true}>
          button
        </Button>
        <Button size="small" color="pink" outline>
          button
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" fullWidth>
          button
        </Button>
        <Button size="large" color="gray" fullWidth>
          button
        </Button>
        <Button
          size="large"
          color="pink"
          fullWidth
          onClick={() => {
            console.log("클릭");
          }}
        >
          button
        </Button>
      </div>
    </div>
  );
}

export default App;

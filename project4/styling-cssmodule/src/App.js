import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Button from "./components/Button";
import Dialog from "./components/Dialog";

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;
const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const palette = {
  blue: "#228be6",
  gray: "#496057",
  pink: "#f06595",
};
function App() {
  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };
  const onConfirm = () => {
    setDialog(false);
  };
  const onCancel = () => {
    setDialog(false);
  };
  return (
    <ThemeProvider theme={{ palette }}>
      <AppBlock>
        <ButtonGroup>
          <Button size="large" onClick={onClick}>
            Button
          </Button>
          <Button color="pink">Button</Button>
          <Button size="small" color="gray">
            Button
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="large" outline>
            Button
          </Button>
          <Button color="pink" outline>
            Button
          </Button>
          <Button size="small" color="gray" outline>
            Button
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="large" fullwidth>
            Button
          </Button>
          <Button color="pink" fullwidth size="large">
            Button
          </Button>
          <Button color="gray" size="large" fullwidth>
            Button
          </Button>
        </ButtonGroup>
        <Dialog
          title="정말 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onCancel={onCancel}
          onConfirm={onConfirm}
          visible={dialog}
        >
          데이터를 삭제할거야?
        </Dialog>
      </AppBlock>
    </ThemeProvider>
  );
}

export default App;

import React,{useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import TodoCreate from './components/TodoCreate';
const GlobalStyle = createGlobalStyle`
body{
    background:#e9ecef;
}`;
const App = () => {
    return (
        <>
            <GlobalStyle/>
            <TodoTemplate>
                <TodoHead/>
                <TodoList/>
                <TodoCreate/>
            </TodoTemplate>
            
        </>
    );
}

export default App;
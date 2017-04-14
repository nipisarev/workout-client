import React from "react";
import ReactDOM from "react-dom";
import Button from "react-toolbox/lib/button";
import './app.scss';
import './img/bg.jpg';
const container = document.getElementById('app');
const app = ReactDOM.render(<Button label="Поиск" accent/>, container);

if (module.hot) {
    module.hot.accept(() => {
        const App = <Button label="Поиск" accent/>;
        ReactDOM.render(<App/>, container)
    });
}


import React from "react";
import ReactDOM from "react-dom";
import Button from "react-toolbox/lib/button";
import {AppBar} from "react-toolbox/lib/app_bar";
import Navigation from "react-toolbox/lib/navigation";
import {Link} from "react-toolbox/lib/link";
import "./app.scss";
import "./img/bg.jpg";

const App = () => (
  <div>
    <AppBar title='Workout' leftIcon='menu'>
      <Navigation type='horizontal'>
        <Link href='/profile' active label='Profile' icon='person'/>
      </Navigation>
    </AppBar>
    <Button label="Поиск" accent/>
  </div>
);
const container = document.getElementById('app');
const app = ReactDOM.render(<App/>, container);

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(<App/>, container)
  });
}


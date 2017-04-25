import React, {Component} from "react";
import Button from "react-toolbox/lib/button";
import {AppBar} from "react-toolbox/lib/app_bar";
import Navigation from "react-toolbox/lib/navigation";
import {Link} from "react-toolbox/lib/link";
import "./app.scss";
import "./img/bg.jpg";

export class App extends Component {
  render({children}) {
    return <div>
      <AppBar title='Workout' leftIcon='menu'>
        <Navigation type='horizontal'>
          <Link href='/catalog' active label='Catalog' icon='person'/>
          <Link href='/catalog/item' active label='Item' icon='person'/>
          <div>{children}</div>
        </Navigation>
      </AppBar>
      <Button label="Поиск" accent/>
    </div>;
  }
}

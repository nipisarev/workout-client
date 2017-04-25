import React from "react";

export class Catalog extends Component {
  render({children}) {
    return <div>
      Catalog
      <ol>
        <li>{children}</li>
      </ol>
    </div>;
  }
}

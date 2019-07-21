import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";

import { MapState } from "../../store/map/maptypes";
import { selectMapId } from "../../store/map/mapactions";

import { TampereMap } from "./tampere/TampereMap";

//import { thunkSelectMapId } from "./thunks";

interface AppProps {
  selectMapIdHandler: typeof selectMapId;
  map: MapState;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

//export class VisionMap extends React.Component<AppProps> {
  export class VisionMap extends React.Component {  
  state = {
    message: ""
  };
/*
  componentDidMount() {
    this.props.selectMapId({
      id: "MAP_ID_123"
    });
  }

  selectMapId = (id: string) => {
    this.props.selectMapId({
      id: id
    });
  };
  */

  

  selectMapIdHandler = () => {
    //this.setState({purchasing: true});
  }


  render() {
    return (
      <>
        <TampereMap
          zoom={10}
          selectMapId={this.selectMapIdHandler}
        />
      </>
    );
  }
}

/*
const mapStateToProps = (state: AppState) => ({
  map: state.map
});

export default connect(
  mapStateToProps,
  { selectMapId }
)(VisionMap);
*/
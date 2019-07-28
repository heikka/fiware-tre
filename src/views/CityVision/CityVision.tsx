import React, { Component, Dispatch } from 'react';

import { VisionControls } from '../../components/Vision/VisionControls/VisionControls';
import { Vision } from '../../components/Vision/Vision';
import { Modal } from '../../components/UI/Modal/Modal';
import TampereMap from '../../components/maps/tampere/TampereMap';
import { connect } from 'react-redux';
import * as mapactiontypes from '../../store/map/mapactiontypes';
import { MapActionTypes, MapPoint } from '../../store/map/mapactiontypes';
import { PointActionTypes } from '../../store/point/pointactiontypes';
import  * as pointActionTypes from '../../store/point/pointactiontypes';

export interface OwnProps {
    onMapPointSelected: (mapPoint: MapPoint) => void,
    onClearMapPointSelected: () => void
}

interface StateProps {
    propFromReduxStore: string
}

interface DispatchProps {
    onSomeEvent: () => void 
}

type Props = StateProps & DispatchProps & OwnProps

/*
interface Props {
    onMapPointSelected: (mapPoint: MapPoint) => void
}
*/
interface State {
    readonly showDetails: boolean
}


const CityVision = ({onMapPointSelected, onClearMapPointSelected}: OwnProps, state: State) => {
    return (
        <>
            <Modal show={state.showDetails}>
                Site details
                </Modal>
            <TampereMap
                zoom={10}
                mapPointSelected={onMapPointSelected}
                clearAllSelectedMapPoints={onClearMapPointSelected}
            //selectMapId={this.selectMapIdHandler}
            />
            <VisionControls />
        </>
    );
}

const mapStateToProps = (state: any, ownProps: any) => {
    return state;
}

const mapDispatchToProps = (dispatch: Dispatch<PointActionTypes>) => {
    return {
        onMapPointSelected: (id: string, address: string) => dispatch({ type: pointActionTypes.SELECT_MAP_ID, payload: { id: id, address: address}  }),
        onClearMapPointSelected: (mapPoint: MapPoint) => dispatch({ type: pointActionTypes.CLEAR_MAP_POINTS })
    }
}

/*
const mapDispatchToProps = (dispatch: Dispatch<MapActionTypes>) => {
    return {
        onMapPointSelected: (mapPoint: MapPoint) => dispatch({ type: mapactiontypes.SELECT_MAP_ID, payload: mapPoint })
    }
}
*/

export default connect<OwnProps>(mapStateToProps, mapDispatchToProps)(CityVision);

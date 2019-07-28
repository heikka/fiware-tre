import React, { Dispatch, useState, useEffect } from 'react';

import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { Backdrop } from '../UI/Backdrop';
import { TrendChart } from '../../Chart/TrendChart/TrendChart';
import { AppState } from '../../../store';
import { connect } from 'react-redux';
import * as pointactiontypes from '../../../store/point/pointactiontypes';
import { PointActionTypes, MapPoint } from '../../../store/point/pointactiontypes';
import { selectMapId, clearMapPoints } from '../../../store/point/pointactions';

interface StateProps {
    selectedMapPoints: []
    //onMapPointClear: () => void
    //onMapPointClear: any
    //onMapPointSelected: (mapPoint: MapPoint) => void
}

interface OwnProps {
    onMapPointClear: () => void
}

interface ActionProps {
    onMapPointClear: () => void
    //onMapPointClear: any
    //onMapPointSelected: (mapPoint: MapPoint) => void
}


interface Props {
    //readonly selectMapId: typeof selectMapId;
    //readonly map: MapState;

    readonly open: boolean;
    readonly closed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    //onMapPointClear: () => void
}

interface State {
    readonly showDetails: boolean
}


const ToolDrawer = ({ open, closed, selectedMapPoints }: Props & StateProps, state: State) => {

    const [count, setCount] = useState(0);
    const [doOpen, setDoOpen] = useState(false);

    useEffect(() => {
        if (selectedMapPoints && selectedMapPoints.length) {
            setDoOpen(true);
        }
        else {
            setDoOpen(false);
        }
    });

    let attachedClasses = ["tool-drawer", "close-right"];
    if (open || doOpen) {
        attachedClasses = ["tool-drawer", "open-right"];
    }
    return (
        <>
            <div className={attachedClasses.join(' ')}>
                <ul>
                    {selectedMapPoints.map((mapPoint, index) => {
                        return <li key={index}>{mapPoint['id']} {mapPoint['address']}</li>
                    })}
                </ul>
            </div>
        </>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        selectedMapPoints: state.point.selectedMapPoints
    };
}

const mapDispatchToPropsnnn = (dispatch: any) => ({
    onMapPointClear: () => dispatch(clearMapPoints())
});

const mapDispatchToProps = (dispatch: Dispatch<PointActionTypes>) => {
    return {
        onMapPointClear: () => dispatch(clearMapPoints())
    }
}


const mapDispatchToPropsxx = {
    selectMapId,
    clearMapPoints
};

const mapDispatchToPropsx = (dispatch: any) => {
    return {
        onMapPointSelected: (mapPoint: MapPoint) => dispatch({ type: pointactiontypes.SELECT_MAP_ID, payload: mapPoint }),
        onMapPointClear: () => dispatch({ type: pointactiontypes.CLEAR_MAP_POINTS })
    }
}


export default connect<StateProps>(mapStateToProps, mapDispatchToProps)(ToolDrawer);

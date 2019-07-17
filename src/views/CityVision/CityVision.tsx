import React, { Component } from 'react';

import { VisionControls } from '../../components/Vision/VisionControls/VisionControls';
import { Vision } from '../../components/Vision/Vision';
import { Modal } from '../../components/UI/Modal/Modal';

interface State {
    readonly showDetails: boolean
}

export class CityVision extends Component {
    state: State = {
        showDetails: false
    }

    detailsClosedHandler: any = (): any => {
    }

    render () {
        return (
            <>
                <Modal show={this.state.showDetails}>
                    Site details
                </Modal>
                <Vision />
                <VisionControls />
            </>
        );
    }
}


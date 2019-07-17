import React, { Component, ReactNode } from 'react';
import { Backdrop } from '../../Navigation/UI/Backdrop';

interface Props {
    readonly show: boolean;
    readonly modalClosed?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    readonly children?: ReactNode;
}

export const Modal = ({ show, modalClosed, children }: Props) => (

    /*
    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show;
    }
*/

    <>
        <Backdrop show={show} clicked={modalClosed} />
        <div
            className="modal"
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? 1 : 0
            }}>
            {children}
        </div>
    </>
);


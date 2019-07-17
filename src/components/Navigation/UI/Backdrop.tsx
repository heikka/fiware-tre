import React from 'react';

interface Props {
    readonly show: boolean;
    readonly clicked?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const Backdrop = ({ show, clicked }: Props) => (
    show ? <div className="backdrop" onClick={clicked}></div> : null
);


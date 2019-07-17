import React, { MouseEventHandler } from 'react';

interface Props {
    readonly clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const DrawerToggle = ({ clicked }: Props) => (
    <div className="drawer-toggle" onClick={clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);


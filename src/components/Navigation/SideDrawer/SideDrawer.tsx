import React from 'react';

import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { Backdrop } from '../UI/Backdrop';
import { TrendChart } from '../../Chart/TrendChart/TrendChart';

interface Props {
    readonly open: boolean;
    readonly closed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const SideDrawer = ({ open, closed }: Props ) => {
    let attachedClasses = ["side-drawer", "close"];
    if (open) {
        attachedClasses = ["side-drawer", "open"];
    }
    return (
        <>
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};
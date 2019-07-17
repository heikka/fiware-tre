import React from 'react';

import { Logo } from '../../Logo/Logo';

import { NavigationItems } from '../NavigationItems/NavigationItems';

import { DrawerToggle } from '../SideDrawer/DrawerToggle/DrawerToggle';

interface Props {
    drawerToggleClicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const Toolbar = ({ drawerToggleClicked }: Props) => (
    <header className="toolbar">
        <DrawerToggle clicked={drawerToggleClicked} />
        <div className="logo">
            <Logo />
        </div>
        <nav className="desktopOnly">
            <NavigationItems />
        </nav>
    </header>
);


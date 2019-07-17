import React from 'react';

import logoImage from '../../assets/images/Capelon.png';

interface Props {
    readonly height?: number;
}

export const Logo = ({ height }: Props) => (
    <div className="logo-container" style={{ height: height }}>
        <a href="https://www.capelon.se/"><img src={logoImage} alt="Capelon" /></a>
    </div>
);

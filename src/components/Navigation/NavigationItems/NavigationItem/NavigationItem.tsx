import React, { ReactNode } from 'react';

interface Props {
    readonly link: string;
    readonly active?: boolean;
    readonly children: ReactNode;
}

const navigationItem = ({ link, active, children }: Props) => (
    <li className="navigation-item">
        <a
            href={link}
            className={active ? "active" : ""}>{children}</a>
    </li>
);

export default navigationItem;
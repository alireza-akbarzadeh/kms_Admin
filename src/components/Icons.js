import React from 'react';
import Iconify from "./Iconify";

const Icons = ({option, sx}) => {
    const getIcon = (name) => <Iconify sx={sx} icon={name} width={22} height={22}/>;
    return getIcon(option)
};
export default Icons;

import * as  React from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography, ListItemText, ListItemIcon} from '@mui/material';
import {Link} from "react-router-dom";
import Iconify from "../../components/Iconify";
import {motion} from "framer-motion";
import styled from '@emotion/styled';

const Align = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 40px;
  padding-right: 20px;
`
const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
});

const AccordionNav = ({data, icon, info}) => {
    const getIcon = (name) => <Iconify icon={name} width={22} height={22}/>;
    const [isOpen, setIsOpen] = React.useState(false);
    const variants = {
        open: {opacity: 1, x: 0},
        closed: {opacity: 0, x: "-100%"},
    }
    return (
        <>
            <Align>
                <ListItemIconStyle>{icon}</ListItemIconStyle>
                <ListItemText onClick={() => setIsOpen((prev) => !prev)}>{data.title}</ListItemText>
                {isOpen ? (
                    <>
                        {getIcon('bx:chevron-up')}

                    </>
                ) : (
                    <>
                        {getIcon('eva:arrow-ios-downward-outline')}
                    </>
                )}
            </Align>
            {isOpen && (
                <>
                    {data.isMulti.map((item) => (
                        <motion.div
                            animate={isOpen ? "open" : "closed"}
                            variants={variants}>
                            <Link to={item.path}>
                                {item.title}
                            </Link>
                        </motion.div>
                    ))}
                </>
            )}
        </>
    );
};

export default AccordionNav;

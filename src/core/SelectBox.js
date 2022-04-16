import React from 'react';
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useTranslation} from "react-i18next";

const SelectBox = ({data, fullWidth, style, label, onChange, ...rest}) => {
    const {t} = useTranslation();
    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel>{label}</InputLabel>
            <Select style={style} onChange={(e) => onChange(e)} {...rest} >
                {data?.map((item, i) => (
                    <MenuItem dir={t('rtl')} key={item.value + i} value={item.value}>{item.text}</MenuItem>))}
            </Select>
        </FormControl>);
};

export default SelectBox;

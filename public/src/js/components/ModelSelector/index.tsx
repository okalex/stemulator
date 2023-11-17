import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { Model } from './Model';

type Props = {
    model: Model,
    setModel: (model: Model) => void,
    sx?: object,
};

export function ModelSelector({ model, setModel, sx }: Props) {

    function handleChange(event) {
        setModel(event.target.value);
    };

    return (
        <Box sx={sx}>
            <FormControl fullWidth>
                <InputLabel id="model-label">Model</InputLabel>
                <Select
                    labelId="model-label"
                    id="model-select"
                    value={model}
                    label="Model"
                    onChange={handleChange}
                >
                    <MenuItem value="htdemucs_ft">htdemucs_ft</MenuItem>
                    <MenuItem value="htdemucs">htdemucs</MenuItem>
                    <MenuItem value="htdemucs_6s">htdemucs_6s</MenuItem>
                    <MenuItem value="hdemucs_mmi">hdemucs_mmi</MenuItem>
                    <MenuItem value="mdx">mdx</MenuItem>
                    <MenuItem value="mdx_extra">mdx_extra</MenuItem>
                    <MenuItem value="mdx_q">mdx_q</MenuItem>
                    <MenuItem value="mdx_extra_q">mdx_extra_q</MenuItem>
                    <MenuItem value="SIG">SIG</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

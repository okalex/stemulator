import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { allModels, Model } from './Model';

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
                    {allModels.map((model) => <MenuItem value={model}>{model}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}

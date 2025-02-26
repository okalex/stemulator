import { makeStyles } from "@fluentui/react-components";

export const useAppStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
    },

    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },

    inline: {
        display: 'inline-block',
    },
});

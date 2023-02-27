import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    navlinks: {
        marginLeft: theme.spacing(8),
        display: "flex",
        marginRight: theme.spacing(8),

    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "12px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
    subLink: {
        textDecoration: "none",
        color: "white",
        fontSize: "12px",
        marginLeft: theme.spacing(5),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

export default useStyles;

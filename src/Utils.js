import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {day_from} from "./config";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

export const Item3 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export const priorDays = () => {
 //   var days=30; // Days you want to subtract
    var date = new Date();
    var last = new Date(date.getTime() - (day_from * 24 * 60 * 60 * 1000));
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();

    return year + "-" + month + "-" + day
}

export const dateString1 = (value) => {
    //   var days=30; // Days you want to subtract
    var date = new Date(value);
    var day =date.getDate();
    var month=date.getMonth()+1;
    var year=date.getFullYear();

    return year + "-" + month + "-" + day
}


export const today = () => {
    var date = new Date();
    var day =date.getDate();
    if (parseInt(day) < 10) day = "0" + day
    var month=date.getMonth()+1;
    if (parseInt(month) < 10) month = "0" + month
    var year=date.getFullYear();

    return year + "-" + month + "-" + day
}

export const menuItems = [
    {
        title: 'Home',
        url: '/restroom/home',
    },
    {
        title: 'Master Data',
        url: '/restroom/masterdata',
    },

    {
        title: 'Geergia Pacific Dispenser',
        url: '/restroom/productusage',
        submenu: [
            {
                title: 'Product Usage',
                url: '/restroom/productusage',
            },
            {
                title: 'Product Alert',
                url: '/restroom/productalert'
            },
            {
                title: 'Battery Alert',
                url: '/restroom/batteryalert'
            },
            {
                title: 'Cover Event',
                url: '/restroom/coverevent'
            },
            {
                title: 'Power Up',
                url: '/restroom/powerup'
            }
        ],
    },

    {
        title: 'Zurn Flush Valve & Faucet',
        url: '/restroom/activationsummary',
        submenu: [
            {
                title: ' Activation Events',
                url: '/restroom/activationevents',
            },
            {
                title: 'Activation Summary',
                url: '/restroom/activationsummary',
            },
        ],
    },
];
import host from "./lib/hostName";

//export const host = process.env.host || 'https://sirendev.westus.cloudapp.azure.com';
export const server = process.env.server || '/api/v1';
export const defaultDispenserDeveui = process.env.defaultDispenserDeveui || '0000F30EFA06D7B5';
export const defaultZurnDeveui = process.env.defaultZurnDeveui || '7835A03CF8EAF9B8';
export const defaultZurnEventsChartType = process.env.defaultZurnEventsChartType || 'minuteslag';
export const defaultProductAlertChartType = process.env.defaultProductAlertChartType || 'stackbar';
export const day_from = 15;


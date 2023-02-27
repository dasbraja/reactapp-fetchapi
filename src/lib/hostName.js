// @flow
const env = process.env.NODE_ENV;
console.log(env)
let origin = window.location.origin;
let host = origin;
if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    host = 'https://sirendev.westus.cloudapp.azure.com/';
    if (env === 'production') {
        host += '/api/v1';
    }
}
console.log(host);
export default host;
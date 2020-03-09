let endpoint = process.env.REACT_APP_API_ENDPOINT;
if (endpoint.endsWith("\';")){
    endpoint = endpoint.substring(0, endpoint.length - 2);
}
export const apiPath = endpoint;
export const StripeKey=process.env.REACT_APP_STRIPE_KEY;
export const appCluster = "ap2";
export const appKey = "b09818c06fc0ecc9aa99";



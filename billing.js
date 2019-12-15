import { success, failure } from "./libs/response-lib";
import { calculateCost } from "./libs/billing-lib";
import stripePackage from "stripe";

export const main = async (event, context) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    // Load secret key
    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

    try {
        await stripe.charges.create({
            source,
            amount,
            description,
            currency: "usd"
        });
        return success({ status: true });
    } catch (e) {
        console.log("Error with billing.", e);
        return failure({ message: e.message });
    }
};
import { env } from '$env/dynamic/private';
import { MongoClient, type OptionalId } from 'mongodb';
import type { RequestHandler } from "./$types";


if (!env.MONGO_URI) throw new Error(`env.MONGO_URI was ${env.MONGO_URI}`);
const client = await new MongoClient(env.MONGO_URI).connect();

export const POST = (async ({ request }) => {
    try {
        const body: OptionalId<Document> = await request.json();

        // If the email already exists in the db, respond with a success but don't add the email to the db again
        if (await client.db().collection("emails").findOne(body)) return new Response("", { status: 200 });
        
        await client.db().collection("emails").insertOne(body);
        return new Response("", { status: 200 });

    } catch (error) {
        return new Response(String(error), { status: 500 });
    }
}) satisfies RequestHandler;
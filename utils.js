import 'dotenv/config';
import fetch from 'node-fetch';
import {verifyKey} from 'discord-interactions';

export function VerifyDiscordRequest(clientKey) {
    return function (req, res, buf, encoding) {
        const signature = req.get('X-Signature-Ed25519');
        const timestamp = req.get('X-Signature-Timestamp');

        const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
        if (!isValidRequest) {
            res.status(401).send('Bad Request Signature');
            throw new Error('Bad request signature');
        }
    };
}

export async function DiscordRequest(endpoint, options) {
    // append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;
    //Stringify payloads
    if (options.body) options.body = JSON.stringify(options.body);
    // Use node-fetch to make requests
    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'Baka_Counter (https://github.com/Sir-NoChill/baka_counter.git)',
        },
        ...options
    });
    //API Errors
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error((JSON.stringify(data)));
    }
    //return the original response
    return res
}

//returns a random emoji from the list
export function getRandomEmoji() {
    const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
    return emojiList[Math.floor((math.random() * emojiList.length))];
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
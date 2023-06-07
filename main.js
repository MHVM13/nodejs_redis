import {createClient} from 'redis';

const client = createClient({
    url: 'redis://redis:6379'
});

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('*** Successful connection to Redis ***\n'));

await client.connect();

const exTime = 3
let timer = 0

// Expiration time = 3s
await client.set('User', 'id1234567', {
    EX: exTime,
});

console.log(`Time: ${timer}ms: ${await client.get('User')}`);

function wait(millis) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('')
        }, millis);
    })
}

async function print() {
    for (let i = 0; i < exTime + 1; ++i) {
        timer += 1000;
        await wait(1000);
        console.log(`Time: ${timer}ms: ${await client.get('User')}`);
    }

    await client.disconnect()
}

print();


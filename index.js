const { Rest, Realtime } = require('ably');

const rest = new Rest(process.env.KEY);
const connection = process.env.CONNECTION;
const clientId = `nevaya-${connection}`;
let realtimeHost;

if (connection === 'proxy') {
  realtimeHost = 'ably.tv.nevaya.net';
} else if (connection === 'direct') {
  realtimeHost = 'realtime.ably.io';
} else {
  throw new Error(`Unrecognised CONNECTION=${connection}`);
}

const run = async () => {
  const details = await rest.auth.requestToken({ clientId })

  const realtime = new Realtime({
    realtimeHost,
    logLevel: 4,
    tokenDetails: details,
  });

  const receiver_channel = realtime.channels.get('test');
  receiver_channel.subscribe(console.log);
}

run();

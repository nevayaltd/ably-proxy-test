const { Rest, Realtime } = require('ably');

const rest = new Rest(process.env.KEY);
const connection = process.env.CONNECTION;
const clientId = `nevaya-${connection}`;
let options;

if (connection === 'proxy') {
  options = {
    realtimeHost: 'ably.tv.nevaya.net',
    fallbackHosts: ['ably-fallback.tv.nevaya.net'],
  }
} else if (connection === 'direct') {
  options = {
    realtimeHost: 'main.realtime.ably.net',
    fallbackHosts: ['main.a.fallback.ably-realtime.com'],
  }
} else {
  throw new Error(`Unrecognised CONNECTION=${connection}`);
}

const run = async () => {
  const details = await rest.auth.requestToken({ clientId })

  const realtime = new Realtime({
    ...options,
    logLevel: 4,
    tokenDetails: details,
  });
  realtime.connection.on('failed', console.error);

  const receiver_channel = realtime.channels.get('test');
  receiver_channel.subscribe(console.log);
}

run();

const { Rest, Realtime } = require('ably');

const rest = new Rest(process.env.KEY);

const run = async () => {
  const details = await rest.auth.requestToken({ clientId: 'tls-proxy-test' })

  const realtime = new Realtime({
    // realtimeHost: 'realtime.ably.io',
    realtimeHost: 'ably.tv.nevaya.net',
    logLevel: 4,
    tokenDetails: details,
  });

  const receiver_channel = realtime.channels.get('test');
  receiver_channel.subscribe(console.log);
}

run();

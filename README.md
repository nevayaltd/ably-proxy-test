# ably-proxy-test

A test repo to see if TLS termination at a CDN with realtime.ably.io as
an origin will permit us to wrap our own TLS policy for elderly clients.

## Usage:

For direct connection:

    $ KEY=YOUR_KEY CONNECTION=direct node index.js

For proxy:

    $ KEY=YOUR_KEY CONNECTION=proxy node index.js

Client ID will be `nevaya-direct` or `nevaya-proxy` accordingly.

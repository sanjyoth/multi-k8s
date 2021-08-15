const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index == 0) return 0;
  if (index == 1) return 1;
  let n1=0, n2=1;
  let sum = 0;

  for (let i=2; i<=index; i++) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return sum;
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');

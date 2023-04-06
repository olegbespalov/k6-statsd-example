# k6 statsd example

This is a simple example of how to use k6 with StatsD.

Run a StatsD server in a docker:

```sh
docker run --name k6-statsd-example --rm -v $PWD/config.js:/usr/src/app/config.js -p 8125:8125/udp -p 8126:8126 statsd/statsd
```

In a separate terminal, run k6:


```sh
K6_STATSD_ENABLE_TAGS=true K6_STATSD_PUSH_INTERVAL=100ms k6 run --out statsd script.js
```

You should see the metrics in the StatsD server terminal:

Stop the StatsD server:

```sh
docker stop k6-statsd-example
```
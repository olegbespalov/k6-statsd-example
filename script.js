import http from "k6/http";
import { check, sleep } from "k6";

import { Trend } from 'k6/metrics';

const myTrend = new Trend('waiting time');

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: "per-vu-iterations",
      vus: 1,
      iterations: 1,
      maxDuration: "30s",
    },
  },
};

export default function () {
  const res = http.get("https://test.k6.io/", {tags: { "mytag": "test-tag" }});
  myTrend.add(res.timings.waiting);

  check(
    res,
    { "status_is_200": (r) => r.status === 200 },
    { "mytag": "test-tag" }
  );
  sleep(0.5);
}
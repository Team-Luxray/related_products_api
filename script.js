import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');


export const options = {
  stages: [{duration: '5s', target: 100}, {duration: '10s', target: 500}, {duration: '5s', target: 100}]
};

export default function () {

  let id = Math.floor(Math.random() * 1000000);
  // http://localhost:3000/products
  // http://localhost:3000/products/${id}
  // http://localhost:3000/products/${id}/styles

  const res = http.get(`http://localhost:3000/products`);
  sleep(1);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000s': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  })
}


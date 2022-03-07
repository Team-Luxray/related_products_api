import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  // http.get('http://localhost:3000/products');
  // sleep(1);

  // for (let id = 1; id <= 100; id++) {
  //   http.get(`http://localhost:3000/products/${id}`);
  // }

  for (let id = 1; id <= 100; id++) {
  http.get(`http://localhost:3000/products/${id}/styles`);
  }
  sleep(1)
}


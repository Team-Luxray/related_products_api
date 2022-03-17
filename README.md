# Systems Design Capstone

### Task
Built a backend API that could scale to web server level. Achieved 3000 requests / second and sub 50ms latency.

### Learnings
Using secondary indexes to optimize table lookup speeds from O(N) to O(logN), horizontally scaling servers with a load balancer and using a ELT process to load millions of lines of csv data into my table schema. Limitations were having to use free-tier t2 micro instances on AWS.


### Build
NGINX, AWS EC2, PostgreSQL, loader.io (deployed testing) and k6 (local testing).

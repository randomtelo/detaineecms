const cluster = require('cluster');
const numCPUs = 8;
const app = require('./app');
let workers = [];
if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        let worker = cluster.fork();
        workers.push(worker);
    }
} else {
    if (cluster.isWorker) {
        const worker_id = cluster.worker.id;
        app.listen(3001);
        console.log('Worker_id: ' + worker_id + ' started.');
    }
}
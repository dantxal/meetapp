import 'dotenv/config';

import Bee from 'bee-queue';
import NewSubscription from '../app/jobs/NewSubscription';

import redisConfig from '../config/redis';

const jobs = [NewSubscription];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // on event for error handling and logging
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  /**
   * The handler called in the 'on event' before processing
   */
  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();

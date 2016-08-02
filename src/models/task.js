import { Model } from 'backbone';
import { loadData } from '../services/data';

export default class Task extends Model {

  initialize (options) {
    this.set('task_id', +options.task_id);
  }

  defaults () {
    return {
      task_id: 0,
      perms: {},
      logs: [],
    }
  }

}

/**
 * Fetch data from server.
 * @returns {*|Promise.<T>}
 */
Task.prototype.fetch = function () {
  const self = this;

  return loadData('getTaskInfo', {
    tid: self.get('task_id')
  })
      .then (function (data) {
          self.set({
            logs: self.getLogs(data.logs),
            perms: data.perms
          });
          self.setInfo(data.task_info);
          self.trigger('reset');
      });
};

/**
 * Helper function.
 * Parse date to object.
 * @param date
 * @returns {Date}
 */
Task.prototype.getDate = function (date) {
  let dateObject = new Date(parseInt(date) * 1000);
  if (date && dateObject) {
    return dateObject;
  }
  return null;
};

/**
 * Helper function.
 * Parse logs.
 * @param logs
 * @returns {Array}
 */
Task.prototype.getLogs = function (logs) {
  if (logs && logs[0] && Array.isArray(logs[0])) {
    logs = logs[0];
  }

  let logList = [];
  let lastDate = '';
  for (let i = 0, l = logs.length; i < l; i++) {
    // Create group.
    let date = logs[i].created;
    if (date != lastDate) {
      lastDate = date;

      let log = {};
      log.type = 'TIMELINE';
      log.time = this.getDate(lastDate);
      log.color = 'red';
      logList.push(log);
    }

    let log = {};
    log.id = +logs[i].lid;
    log.type = logs[i].action;
    log.task = logs[i].ticket_id;
    log.hours = +logs[i].hours || 0;
    log.user = logs[i].user_name || logs[i].user_id;
    log.time = this.getDate(logs[i].created);
    log.description = logs[i].entry;

    // Set icon and color for timeline.
    switch (log.type) {
      case 'Question':
        logs[i].icon = 'question';
        logs[i].color = 'green';
        break;

      case 'Message':
        log.icon = 'envelope';
        log.color = 'blue';
        break;

      case 'Note':
        log.icon = 'comment-o';
        log.color = 'blue';
        break;

      case 'ASSIGNED':
        log.icon = 'user-plus';
        log.color = 'yellow';
        break;

      case 'CREATED':
        log.icon = 'plus';
        log.color = 'yellow';
        break;

      case 'CLOSE':
        log.icon = 'close';
        log.color = 'red';
        break;

      case 'EDIT':
        log.icon = 'pencil';
        log.color = 'green';
        break;

      case 'REJECTED':
        log.icon = 'level-up';
        log.color = 'red';
        break;

      case null:
        log.icon = 'envelope';
        log.color = 'blue';
        break;
    }

    logList.push(log);
  }

  return logList;
};

/**
 * Set info data for task from server data.
 * @param data
 */
Task.prototype.setInfo = function (data) {
  this.set({
    user: data.user_name,
    project: data.project_title,
    status: data.status,
    worked: data.wkd_hours,
    title: data.title,
    description: data.description,
    estimated: data.est_hours,
    priority: data.priority,
    start_date: this.getDate(data.start_date),
    open_time: this.getDate(data.otime),
    deadline: this.getDate(data.deadline)
  })
};

import { Model } from 'backbone';
import { loadData } from '../services/data';

export default class Task extends Model {

  initialize (options) {
    this.set('task_id', options.task_id)
  }

  defaults () {
    return {
      task_id: 0,
      perms: {},
      logs: [],
    }
  }

  fetch () {
    const self = this;

    return loadData('getTaskInfo', {
      tid: self.get('task_id')
    })
      .then (function (data) {
        if (data.status == 'ok') {
          data = data.message;

          self.set({
            logs: self.getLogs(data.logs),
            perms: data.perms,
            user: data.task_info.user_name,
            project: data.task_info.project_title,
            status: data.task_info.status,
            worked: data.task_info.wkd_hours,
            title: data.task_info.title,
            description: data.task_info.description,
            estimated: data.task_info.est_hours,
            priority: data.task_info.priority,
            start_date: self.getDate(data.task_info.start_date),
            open_time: self.getDate(data.task_info.otime),
            deadline: self.getDate(data.task_info.deadline)
          })
        }
        else {
          self.set('error', data.message);
        }
      });
  }

  getLogs (logs) {
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
      log.id = logs[i].lid;
      log.type = logs[i].action;
      log.task = logs[i].ticket_id;
      log.hours = logs[i].hours;
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
  }

  getDate(date) {
    let dateObject = new Date(parseInt(date) * 1000);
    if (date && dateObject) {
      return dateObject;
    }
    return null;
  }
}

import { Model } from 'backbone';
import { loadData } from '../services/data';

class AppModel extends Model {
  initialize () {

  }

  defaults () {
    return {
      users: [],
      projects: [],
      types: {
        '2': 'Поддержка',
        '3': 'Услуга',
        '7': 'Услуга',
        '8': 'Задача',
        '11': 'Продвижение'
      },
      statusList: [
        {
          value: 'TASK_STATUS_OPEN',
          title: 'OPEN'
        },
        {
          value: 'TASK_STATUS_CLOSED',
          title: 'CLOSED'
        }
      ],
      userName: 'test'
    };
  }

  fetch () {
    var self = this;
    var promiseList = [
      loadData('getAutherizedUserInfo'),
      loadData('getFilteredUsersList'),
      loadData('getFilteredProjectList', {
        status: 'TASK_STATUS_OPEN'
      })
    ];

    return Promise.all(promiseList)
        .then(function (data) {
          if (data[0] == undefined) {
            return;
          }

          const [ user, users, projects ] = data;
          const { fname, lname, user_id } = user.user_info;
          const { hours_month, hours_today, tickets_month } = user.user_stats;

          self.set({
            hoursMonth: hours_month,
            hoursToday: hours_today,
            ticketsMonth: tickets_month,
            firstName: fname,
            lastName: lname,
            user_id: +user_id,
            users,
            projects
          });

          self.trigger('reset');
        });
  }

  sync () {

  }
}

AppModel.prototype.getUserList = function () {
  var users = this.get('users');
  var result = [];

  for (let user_id in users) {
    result.push({
      value: user_id,
      title: `${users[user_id].fname} ${users[user_id].lname}`
    });
  }

  return _.sortBy(result, 'title');
};

AppModel.prototype.getProjectList = function () {
  var projects = this.get('projects');
  var result = [];

  for (let project_id in projects) {
    result.push({
      value: project_id,
      title: projects[project_id].title
    });
  }

  return _.sortBy(result, 'title');
};

const appModel = new AppModel();

export default appModel;

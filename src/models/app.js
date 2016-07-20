import { Model } from 'backbone';
import { loadData } from '../services/data';

class AppModel extends Model {
  initialize () {

  }

  defaults () {
    return {
      users: [],
      userName: 'test'
    };
  }

  fetch () {
    var self = this;
    var promiseList = [
      loadData('getAutherizedUserInfo'),
      loadData('getFilteredUsersList')
    ];

    return Promise.all(promiseList)
        .then(function (data) {
          const [ user, users ] = data;
          const { fname, lname, user_id } = user.user_info;
          const { hours_month, hours_today, tickets_month } = user.user_stats;

          self.set({
            hoursMonth: hours_month,
            hoursToday: hours_today,
            ticketsMonth: tickets_month,
            firstName: fname,
            lastName: lname,
            user_id: +user_id,
            users
          });

          self.trigger('reset');
        });
  }

  sync () {

  }
}

AppModel.prototype.getUserList = function () {
  var users = this.get('users');
  var result = {};

  for (let user_id in users) {
    result[user_id] = `${users[user_id].fname} ${users[user_id].lname}`;
  }

  return result;
};

const appModel = new AppModel();

export default appModel;

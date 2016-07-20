import { Router } from 'backbone';
import { loadData } from '../services/data';

import LoginView from '../views/login/login';
import AssignedView from '../views/assigned/assigned';
import TicketsView from '../views/tickets';
import TaskDetail from '../views/task-detail/task-detail';

import pageLoad from './pageLoad';

export default class ZenRouter extends Router {
  constructor() {
    super();
    this.routes = {
      'assigned': 'assigned',
      'tickets': 'tickets',
      'task/:task_id': 'taskRoute',
      'login(/*destination)': 'loginRoute',
      '*path': 'redirectRoute'
    };

    this._bindRoutes();
  }

  assigned () {
    pageLoad(AssignedView, {});
  }

  taskRoute (task_id) {
    pageLoad(TaskDetail, {task_id: task_id});
  }

  tickets () {
    pageLoad(TicketsView, {});
  }

  redirectRoute () {
    this.navigate('assigned', {trigger: true});
  }

  loginRoute (destination) {
    pageLoad(LoginView, {
      destination: destination || 'assigned'
    }, true);
  }
}

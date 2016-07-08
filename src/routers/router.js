import { Router } from 'backbone';
import { loadData } from '../services/data';
import LoginView from '../views/login/login';
import pageLoad from './pageLoad';

export default class ZenRouter extends Router {
  constructor() {
    super();
    this.routes = {
      'home': 'homeRoute',
      'login(/*destination)': 'loginRoute',
      '*path': 'redirectRoute'
    };

    this._bindRoutes();
  }

  homeRoute () {
    loadData('getAssignedTaskList')
      .then(function (result) {
        console.log(result)
      })
  }

  redirectRoute () {
    this.navigate('#home', {trigger: true});
  }

  loginRoute (destination) {
    pageLoad(LoginView, {
      destination: destination || 'home'
    });
  }
}

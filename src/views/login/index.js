import { View, history } from 'backbone';
import $ from 'jquery';
import { auth } from '../../services/data';
import template from './login.ejs'

export default class LoginView extends View {

  initialize (options) {
    this.destination = options.destination;
    this.template = template();
  }

  render () {
    this.$el.html(this.template);
  }

  fetch () {
    return Promise.resolve(true);
  }

  authAction (event) {
    const self = this;

    event.preventDefault();
    const login = this.$el.find('#username').val();
    const pass = this.$el.find('#password').val();

    auth(login, pass).then(function () {
      history.navigate(self.destination, {trigger: true});
    })
      .catch(function (error) {
        alert(error)
      })
  }
}

LoginView.prototype.events = {
  'submit form': 'authAction'
};

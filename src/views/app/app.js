import { View, history } from 'backbone';
import $ from 'jquery'
import template from './app.hbs';
import loadingTemplate from '../../templates/loading.hbs';
import { loadData } from '../../services/data';

import AppModel from '../../models/app';
import NewTaskView from '../modals/new-task';

export default class AppView extends View {

  initialize () {
    this.template = template();
    this.model = AppModel;
    this.promise = AppModel.fetch();

    this.hidden = false;
    this.NewTask = new NewTaskView({model: this.model});

    this.model.on('reset', this.render.bind(this));
    this.model.on('app:hide', this.hide.bind(this));
    this.model.on('app:show', this.show.bind(this));
  }

  render () {
    this.$el.html(this.template);
  }

  fetch () {
    return this.promise;
  }

  hide () {
    if (this.hidden == false) {
      this.hidden = true;
      this.$el.hide();
      $(document.body).addClass('sidebar-collapse');
    }
  }

  show () {
    if (this.hidden) {
      this.hidden = false;
      this.$el.show();
      $(document.body).removeClass('sidebar-collapse');
    }
  }
}

AppView.prototype.events = {
    'click .new-task-action': 'showNewTask'
};

AppView.prototype.showNewTask = function () {
    this.NewTask.show();
};

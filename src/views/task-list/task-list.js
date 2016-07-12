import { View } from 'backbone';
import template from './task-list.ejs';

export default class TaskListView extends View {
  initialize () {
    this.template = template();
  }

  render () {
    this.$el.html(this.template);
  }

  fetch () {
    return Promise.resolve(true);
  }
}

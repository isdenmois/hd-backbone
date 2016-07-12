import { View } from 'backbone';
import template from './task-detail.ejs';
import commentsTemplate from './comments.ejs';
import headerTemplate from './header.ejs';
import TaskModel from '../../models/task';

export default class TaskDetail extends View {
  initialize (params) {
    this.task_id = params.task_id;
    this.model = new TaskModel({
      task_id: this.task_id,
    });

    this.promise = this.model.fetch();
  }

  render () {
    const data = this.getRenderedData();
    this.$el.html(template(data));
    if (data.logs && data.logs.length > 0) {
      this.$el.find('.logs-outlet').html(commentsTemplate(data.logs));
    }
  }

  getRenderedData () {
    return this.model.toJSON();
  }

}

TaskDetail.prototype.fetch = function () {
  return this.promise;
};

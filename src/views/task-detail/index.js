import { View } from 'backbone';
import template from './task-detail.ejs';
import commentsTemplate from './comments.ejs';
import headerTemplate from './header.ejs';
import TaskModel from '../../models/task';
import LogView from '../modals/log';
import _ from 'lodash';

export default class TaskDetail extends View {
    initialize(elem, params) {
        this.task_id = params.task_id;
        this.model = new TaskModel({
            task_id: this.task_id
        });

        this.listenTo(this.model, 'fetch', this.render);
        this.modals = {
            log: new LogView({model: this.model})
        };

    }

    render() {
        const data = this.getRenderedData();
        this.$el.html(template(data));
        if (data.logs && data.logs.length > 0) {
            this.$el.find('.logs-outlet').html(commentsTemplate(data.logs));
        }
    }

    destroy() {
        for (let modal in this.modals) {
            this.modals[modal].destroy();
        }
        super.destroy();
    }

}

TaskDetail.prototype.events = {
    'click a.modal-button': 'showModal'
};

TaskDetail.prototype.fetch = function () {
    return this.promise = this.model.fetch();
};

TaskDetail.prototype.showModal = function (event) {
    var modal = event.currentTarget.dataset.type;
    this.modals[modal].show();
};

TaskDetail.prototype.getRenderedData = function () {

    return this.model.toJSON();
};

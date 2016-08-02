import { View } from 'backbone';
import template from './task-detail.hbs';
import commentsTemplate from './comments.hbs';
import TaskModel from '../../models/task';
import LogView from '../modals/log';
import CloseView from '../modals/close';
import _ from 'lodash';

export default class TaskDetail extends View {
    initialize(elem, params) {
        this.task_id = params.task_id;
        this.model = new TaskModel({
            task_id: this.task_id
        });

        this.listenTo(this.model, 'reset', this.render);
        this.modals = {
            log: new LogView({model: this.model}),
            close: new CloseView({model: this.model})
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
    const data =  this.model.toJSON();
    data.perms = ['view', 'log', 'close'];
    return data;
};

import { View } from 'backbone';
import logTemplate from './log.ejs';
import { loadData } from '../../../services/data';
import _ from 'lodash';

export default class LogView extends View {
    initialize () {
        this.$el.attr('role', 'dialog');
        document.body.appendChild(this.el);
        this.listenTo(this.model, 'fetch', this.render);
        this.errors = [];
    }

    render () {
        this.$el.html(this.template(this.getData()));
        this.cacheElements();
        this.$errors = this.$('.modal-body .modal-errors');
    }

    destroy () {
        super.destroy();
        this.remove();
    }
}

LogView.prototype.className = 'modal fade';
LogView.prototype.events = {
    'click .modal-footer .btn-primary': 'sendData',
    'submit form': 'sendData'
};
LogView.prototype.template = logTemplate;
LogView.prototype.actions = [
    {
        value: 'LOG_TYPE_NOTE',
        title: 'Note'
    },
    {
        value: 'LOG_TYPE_QUESTION',
        title: 'Question'
    },
    {
        value: 'LOG_TYPE_LEARNING',
        title: 'Learning'
    }
];

LogView.prototype.show = function () {
    this.$el.modal('show');
};

LogView.prototype.hide = function () {
    this.$el.modal('hide');
};

LogView.prototype.cacheElements = function () {
    this.$hours = this.$('input[name="hours"]');
    this.$comment = this.$('textarea[name="comment"]');
};

LogView.prototype.getData = function () {
    const data = {};

    data.task_id = this.model.get('task_id');
    data.title = this.model.get('title');
    data.title = `#${data.task_id} ${data.title}`;
    data.actions = this.actions;

    return data;
};

LogView.prototype.sendData = function (event) {
    event.preventDefault();
    this.clearErrors();

    const tid = this.model.get('task_id');
    const hours = this.$hours.val();
    const text = this.$comment.val();
    const log_action = this.$('select.activity-select').val();

    if (hours && Number(hours).toString() != hours) {
        this.setError(this.$hours, 'Неправильно заполнено поле рабочих часов.');
    }
    if (text.length == 0) {
        this.setError(this.$comment, 'Поле с комментарием -- пустое');
    }

    if (this.errors.length > 0) {
        return;
    }

    const params = {
        tid,
        log_action,
        text
    };
    if (hours) {
        params.hours = hours;
    }

    loadData('addLog', params, 'POST')
        .then(() => this.model.trigger('modal-completed'))
        .catch(error => this.setError(null, error));
};

LogView.prototype.clearErrors = function () {
    this.$errors.addClass('hidden');
    this.$errors.find('.error-content').empty();
    this.$('.has-error').removeClass('has-error');
    this.errors = [];
};

LogView.prototype.setError = function (elem, error) {
    if (elem) {
        this.$errors.removeClass('hidden');
        elem.parent().addClass('has-error');
    }
    this.$errors
        .find('.error-content')
        .append('<p>' + error + '</p>');
    this.errors.push(error);
};

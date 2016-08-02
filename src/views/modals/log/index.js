import { View } from 'backbone';
import logTemplate from './log.hbs';
import { loadData } from '../../../services/data';
import _ from 'lodash';

export default class LogView extends View {
    initialize () {
        this.$el.attr('role', 'dialog');
        document.body.appendChild(this.el);
        this.listenTo(this.model, 'reset', this.render);
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
    'click .modal-footer .btn-primary': 'act',
    'submit form': 'act'
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

LogView.prototype.getFormData = function () {
    const data = {
        tid: this.model.get('task_id'),
        text : this.$comment.val(),
        log_action: this.$('select.activity-select').val()
    };
    const hours = this.$hours.val();
    if (hours) {
        data.hours = hours;
    }

    return data;
};

LogView.prototype.validate = function (data) {

    if (data.hours && Number(data.hours).toString() != data.hours) {
        this.setError(this.$hours, 'Неправильно заполнено поле рабочих часов.');
    }
    if (data.text.length == 0) {
        this.setError(this.$comment, 'Поле с комментарием -- пустое');
    }

};

LogView.prototype.act = function (event) {
    event.preventDefault();
    this.clearErrors();

    const data = this.getFormData();
    this.validate(data);

    if (this.errors.length > 0) {
        return;
    }

    this.sendData(data)
        .then(() => this.refetch())
        .catch(error => this.setError(null, error));
};

LogView.prototype.sendData = function (data) {
    return loadData('addLog', data, 'POST');
};

LogView.prototype.clearErrors = function () {
    this.$errors.addClass('hidden');
    this.$errors.find('.error-content').empty();
    this.$('.has-error').removeClass('has-error');
    this.errors = [];
};


LogView.prototype.refetch = function () {
    return this.model
        .fetch()
        .then(() => this.hide())
        .then(() => this.clearErrors());
};

LogView.prototype.setError = function (elem, error) {
    if (elem) {
        elem.parent().addClass('has-error');
    }
    this.$errors
        .removeClass('hidden')
        .find('.error-content')
        .append('<p>' + error + '</p>');
    this.errors.push(error);
};

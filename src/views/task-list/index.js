import { View, history } from 'backbone';

import template from './task-list.ejs';
import tableTemplate from './table.ejs';
import emptyTable from './emptyTable.ejs';

import AssignedCollection from '../../collections/assignedCollection';

export default class TaskListView extends View {
    initialize() {
        this.collection = new AssignedCollection();
        this.promise = this.collection.fetch();
        this.template = template();

        this.sortField = '';
        this.sortDir = 1;
    }
}

TaskListView.prototype.columns = [
    {
        name: '#',
        field: 'task_id'
    },
    {
        name: 'Название',
        field: 'title'
    },
    {
        name: 'Проект',
        field: 'project_title'
    },
    {
        name: 'Статус',
        field: 'status'
    },
    {
        name: 'Приоритет',
        field: 'priority'
    },
    {
        name: 'Тип',
        field: 'type'
    },
    {
        name: 'Deadline',
        field: 'deadline'
    }
];

TaskListView.prototype.events = {
    'click table tbody tr': 'open_task',
    'click table thead th.sorting': 'sort',
    'click table thead th.sorting_asc': 'sort',
    'click table thead th.sorting_desc': 'sort'
};

TaskListView.prototype.fetch = function () {
    return this.promise;
};

TaskListView.prototype.getRenderedData = function () {
    const data = {};
    data.taskList = this.collection.toJSON();
    data.columns = this.columns;
    data.filters = [];
    data.sortField = this.sortField;
    data.sortDir = this.sortDir > 0 ? 'sorting_asc' : 'sorting_desc';
    data.notSorted = 'sorting';

    return data;
};

TaskListView.prototype.open_task = function (event) {
    var target = event.currentTarget;
    var id = +target.dataset.id;
    history.navigate('task/' + id, {trigger: true});
};

TaskListView.prototype.promise = function () {
    return this.promise;
};

TaskListView.prototype.render = function () {
    const data = this.getRenderedData();

    this.$el.html(this.template);
    this.renderTable(data);

    return data;
};

/**
 * Render table.
 */
TaskListView.prototype.renderTable = function (data) {
    data = data || this.getRenderedData();
    this.$el
        .find('.table-responsive')
        .html(tableTemplate(data));
};

TaskListView.prototype.sort = function (event) {
    var target = event.currentTarget;
    var sortField = target.dataset.field;
    var taskList = this.collection.models;

    if (this.sortField == sortField) {
        this.sortDir = 1 - this.sortDir;
        this.collection.models = _.reverse(taskList);
    }
    else {
        this.sortDir = 1;
        this.sortField = sortField;
        this.collection.models = _.sortBy(taskList, function(task) {
            return task.get(sortField);
        });
    }

    this.render();
};

import { Collection } from 'backbone';
import Task from '../models/task';
import { loadData } from '../services/data';
import config from '../models/app';

export default class TicketsCollection extends Collection {
    initialize (options) {
        var user = sessionStorage.getItem('tickets-collection-selected-user');
        if (user == null) {
            user = config.get('user_id');
        }
        var project = sessionStorage.getItem('tickets-collection-selected-project');
        var status = sessionStorage.getItem('tickets-collection-selected-status');


        this.filters = {};
        if (user) {
            this.filters.user = user;
        }
        if (project) {
            this.filters.project = project;
        }
        if (status) {
            this.filters.status = status;
        }
    }

    sync() {

    }
}

TicketsCollection.prototype.fetch = function () {
    const collection = this;

    let params = {
        oid: this.filters.user
    };
    if (this.filters.hasOwnProperty('project')) {
        params.pid = this.filters.project;
    }
    if (this.filters.hasOwnProperty('status')) {
        params.status = this.filters.status;
    }

    return loadData('getFilteredTaskList', params)
        .then(function (data) {
            let taskList = [];
            var task;

            for (let id in data) {
                task = new Task({task_id: id});
                task.setInfo(data[id]);
                taskList.push(task);
            }

            collection.reset(taskList);
        })
};

/**
 * Fetch data and trigger render.
 */
TicketsCollection.prototype.updateData = function (filter, value) {
    if (value && value != '0') {
        this.filters[filter] = value;
        sessionStorage.setItem('tickets-collection-selected-' + filter, value);
    }
    else {
        delete this.filters[filter];
        sessionStorage.removeItem('tickets-collection-selected-' + filter);
    }

    this.fetch();
};

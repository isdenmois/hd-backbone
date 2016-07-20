import { Collection } from 'backbone';
import Task from '../models/task';
import { loadData } from '../services/data';
import config from '../models/app';

export default class TicketsCollection extends Collection {
    initialize (options) {
        this.user_id = sessionStorage.getItem('TicketsCollectionSelectedUser');
        this.project_id = sessionStorage.getItem('TicketsCollectionSelectedProject');
        this.status = sessionStorage.getItem('TicketsCollectionSelectedStatus');

        if (this.user_id == null) {
            this.user_id = config.get('user_id');
        }
    }

    sync() {

    }
}

TicketsCollection.prototype.fetch = function () {
    const collection = this;

    let params = {
        oid: this.user_id
    };
    if (this.project_id) {
        params.pid = this.project_id;
    }
    if (this.status) {
        params.status = this.status;
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

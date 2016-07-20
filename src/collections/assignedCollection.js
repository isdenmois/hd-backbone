import { Collection } from 'backbone';
import Task from '../models/task';
import { loadData } from '../services/data';

export default class AssignedCollection extends Collection {
  sync() {

  }
}

AssignedCollection.prototype.fetch = function () {
  const collection = this;

  return loadData('getAssignedTaskList')
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

import LogView from '../log';
import newTaskTemplate from './new-task.hbs';
import { loadData } from '../../../services/data';

export default class NewTaskView extends LogView {

}

NewTaskView.prototype.template = newTaskTemplate;

NewTaskView.prototype.getFormData = function () {
    return {};
};

NewTaskView.prototype.sendData = function (data) {
    return loadData('addTask', data, 'POST');
};

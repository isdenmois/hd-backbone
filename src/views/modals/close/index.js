import LogView from '../log';
import closeTemplate from './close.hbs';
import { loadData } from '../../../services/data';

export default class CloseView extends LogView {

}

CloseView.prototype.template = closeTemplate;

CloseView.prototype.getFormData = function () {
    const data = {
        tid: this.model.get('task_id'),
        text : this.$comment.val()
    };
    const hours = this.$hours.val();
    if (hours) {
        data.hours = hours;
    }

    return data;
};

CloseView.prototype.sendData = function (data) {
    return loadData('closeTask', data, 'POST');
};

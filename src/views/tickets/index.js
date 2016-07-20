import TaskListView from '../task-list/task-list';
import ticketsTemplate from './tickets.ejs';
import filtersTemplate from './filters.ejs';
import TicketsCollection from '../../collections/ticketsCollection';
import config from '../../models/app';

export default class Tickets extends TaskListView {
    initialize() {
        this.collection = new TicketsCollection();
        this.promise = this.collection.fetch();
        this.template = ticketsTemplate();

        this.filters = [
            {
                title: 'Пользователь',
                options: config.getUserList(),
                selected: this.collection.user_id
            },
            {
                title: 'Проект'
            },
            {
                title: 'Статус'
            }
        ];

        this.sortField = '';
        this.sortDir = 1;
    }

    render () {
        var data = super.render();

        this.$el
            .find('.box-primary .box-body')
            .html(filtersTemplate(data));
    }

    getRenderedData () {
        var data = super.getRenderedData();

        data.filters = this.filters;

        return data;
    }
}

function getUser () {

}
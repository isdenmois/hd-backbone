import TaskListView from '../task-list';
import ticketsTemplate from './tickets.hbs';
import filtersTemplate from './filters.hbs';
import TicketsCollection from '../../collections/ticketsCollection';
import config from '../../models/app';

export default class TaskFilteredListView extends TaskListView {
    initialize() {
        this.collection = new TicketsCollection();
        this.template = ticketsTemplate();

        this.filters = [
            {
                title: 'Пользователь',
                type: 'user',
                options: config.getUserList(),
                selected: this.collection.filters.user
            },
            {
                title: 'Проект',
                type: 'project',
                options: [
                    {
                        title: '- любой -',
                        value: 0
                    },
                    ...config.getProjectList()
                ],
                selected: this.collection.filters.project
            },
            {
                title: 'Статус',
                type: 'status',
                options: [
                    {
                        title: '- любой -',
                        value: 0
                    },
                    ...config.get('statusList')
                ],
                selected: this.collection.filters.status
            }
        ];

        this.sortField = '';
        this.sortDir = 1;
        this.templateRendered = false;

        this.events = {
            ...super.events,
            'change .filter-list .task-filter': 'filterChanged'
        };

        this.listenTo(this.collection, 'reset', this.render);
    }

    render () {
        if (this.templateRendered) {
            this.renderTable();
        }
        else {
            var data = super.render();
            this.renderFilters(data);
            this.templateRendered = true;
        }
    }

    getRenderedData () {
        var data = super.getRenderedData();

        data.filters = this.filters;

        return data;
    }
}

/**
 * Render filters.
 */
TaskFilteredListView.prototype.renderFilters = function (data) {
    this.$el
        .find('.box-primary .box-body')
        .html(filtersTemplate(data));
};

TaskFilteredListView.prototype.filterChanged = function (event) {
    var filter = event.target.dataset.filter;
    this.collection.updateData(filter, event.target.value);
};

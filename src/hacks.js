import { View } from 'backbone';
import _ from 'lodash';

Date.prototype.toString = function (withTime = false) {
    let day = this.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = this.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = this.getFullYear();

    if (withTime) {
        let hour = this.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }

        let min = this.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        return `${day}.${month}.${year} ${hour}:${min}`;
    }

    return `${day}.${month}.${year}`;
};

_.mixin({
    nl2br : function(str, is_xhtml){
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
});

View.prototype.destroy = function () {

    // Remove models.
    if (this.collection && this.collection.length) {

        var collection = this.collection.toArray();

        _.invoke(collection, 'close');
        _.invoke(collection, 'destroy');
    }

    if (this.model && this.model.url) {
        this.model.destroy();
    }

    this.stopListening();
    this.undelegateEvents();
    this.unbind();

    this.$el.empty();
};

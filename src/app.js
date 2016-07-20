import Backbone from 'backbone'
import $ from 'jquery'
import ZenRouter from './routers/router'

import 'bootstrap/dist/js/bootstrap.js';
import 'admin-lte/dist/js/app.js';
import 'admin-lte/plugins/datepicker/bootstrap-datepicker.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'admin-lte/dist/css/AdminLTE.css';
import 'admin-lte/dist/css/skins/skin-blue.css';
import 'admin-lte/plugins/datatables/dataTables.bootstrap.css';
import 'admin-lte/plugins/datepicker/datepicker3.css';

import './styles/style.css';

import AppView from './views/app/app';

$(function () {
  const APP_ELEMENT = $('#application');
  const APP_VIEW = new AppView();
  APP_VIEW.setElement(APP_ELEMENT, true);
  APP_VIEW.render();

  APP_VIEW.promise.then(function () {
    new ZenRouter();
    Backbone.history.start();
  });
});

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



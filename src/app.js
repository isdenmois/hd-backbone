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

import './hacks';

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

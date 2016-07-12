import $ from 'jquery';
import loadingTemplate from '../templates/loading.ejs';
import AppModel from '../models/app';

let currentView = {};

const CONTENT_ELEMENT = $('#content');
const loading = loadingTemplate();

export default function pageLoad (view, params, full = false) {
  currentView = new view(params);
  currentView.setElement(CONTENT_ELEMENT, true);

  if (full) {
    AppModel.trigger('app:hide');
  }
  else {
    AppModel.trigger('app:show');
  }

  startLoading();
  currentView.fetch().then(function () {
    currentView.render();
  })
}


function startLoading () {
  CONTENT_ELEMENT.empty().append(loading);
}

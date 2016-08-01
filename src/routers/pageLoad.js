import $ from 'jquery';
import loadingTemplate from '../templates/loading.ejs';
import AppModel from '../models/app';

let currentView = {};

const CONTENT_ELEMENT = $('#content');
const loading = loadingTemplate();

export default function pageLoad (view, params, full = false) {
  if (currentView && currentView.destroy) {
    currentView.destroy();
  }
  startLoading();

  currentView = new view({
    el: CONTENT_ELEMENT
  }, params);
  currentView.setElement(CONTENT_ELEMENT, true);

  if (full) {
    AppModel.trigger('app:hide');
  }
  else {
    AppModel.trigger('app:show');
  }

  currentView.fetch();
}


function startLoading () {
  CONTENT_ELEMENT.empty().append(loading);
}

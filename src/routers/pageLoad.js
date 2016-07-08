import $ from 'jquery';

let currentView = {};

export default function pageLoad (view, params) {
  currentView = new view(params);

  currentView.setElement($('#application'), true);

  currentView.fetch().then(function () {
    currentView.render();
  })
}

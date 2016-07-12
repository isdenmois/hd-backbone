import { Model } from 'backbone';

class AppModel extends Model {
  initialize () {

  }

  defaults () {
    return {
      users: [],
      userName: 'test'
    };
  }

  fetch () {
    this.trigger('reset');
  }

  sync () {

  }
}

const appModel = new AppModel();

export default appModel;

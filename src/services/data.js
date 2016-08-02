import $ from 'jquery';
import { history } from 'backbone';
const path = '/devrest';

export function loadData (servlet, params = {}, method = 'GET') {
  let init = {
    method: method,
    credentials: 'include',
  };

  if (method == 'POST') {
    init.body = new FormData();

    for (let param in params) {
      init.body.append(param, params[param]);
    }
  }
  else {
    let searchParams = new URLSearchParams();

    for (let param in params) {
      searchParams.append(param, params[param]);
    }

    servlet += '&' + searchParams;
  }

  return fetch(`${path}/?op=${servlet}`, init)
    .then(function (response) {

      const type = response.headers.get('Content-Type');
      if (type != 'application/json') {
        console.log();
        throw 'error type:' + type;
      }

      return response.json();
    })
      .then(function (data) {
        if (data.status != 'ok') {
          throw data.message;
        }

        return data.message;
      })
    .catch(function (error) {
        if (typeof error == 'string' && error.substr(0, 11) == 'error type:') {
            if (history.started) {
                const fragment = history.getFragment();
                history.navigate('login/' + fragment);
            }
            else {
                location.hash = '#login';
            }
        }
    })
}

export function auth (login, pass) {
  const init = {
    method: 'POST',
    credentials: 'include',
    body: $.param({
      'TODO': 'Log On',
      'username': login,
      'passphrase': pass
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  };

  return fetch(`${path}/?op=getAssignedTaskList`, init)
    .then(function (response) {
      const type = response.headers.get('Content-Type');
      if (type != 'application/json') {
        throw 'Неправильный логин или пароль';
      }

      return true;
    });
}

import { dataToArray } from './util';
function EventDispatcher(target) {
  this._listeners = {};
  this._eventTarget = target || {};
  this.recoverLists = [];
}
EventDispatcher.prototype = {
  addEventListener(type, callback) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    let list = this._listeners[_type];
    let index = 0;
    let listener;
    let i;
    if (!list) {
      this._listeners[_type] = list = [];
    }
    i = list.length;

    while (--i > -1) {
      listener = list[i];
      if (listener.n === namespaces && listener.c === callback) {
        list.splice(i, 1);
      } else if (index === 0) {
        index = i + 1;
      }
    }
    const func = this.dispatchEvent.bind(this, _type);
    list.splice(index, 0, { c: callback, n: namespaces, t: _type, func });
    if (this._eventTarget.addEventListener) {
      this._eventTarget.addEventListener(_type, func, false);
    } else if (this._eventTarget.attachEvent) {
      this._eventTarget.attachEvent(`on${_type}`, func);
    }
  },

  removeEventListener(type, callback, force) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    const list = this._listeners[_type];
    let i;
    let _force = force;
    if (!namespaces) {
      _force = true;
    }
    if (list) {
      i = list.length;
      while (--i > -1) {
        if (list[i].c === callback && (_force || list[i].n === namespaces)) {
          if (this._eventTarget.removeEventListener) {
            this._eventTarget.removeEventListener(list[i].t, list[i].func);
          } else if (this._eventTarget.detachEvent) {
            this._eventTarget.detachEvent(`on${list[i].t}`, list[i].func);
          }
          list.splice(i, 1);
          if (!_force) {
            return;
          }
        }
      }
    }
  },

  dispatchEvent(type, e) {
    const list = this._listeners[type];
    let i;
    let t;
    let listener;
    if (list) {
      i = list.length;
      t = this._eventTarget;
      while (--i > -1) {
        listener = list[i];
        if (listener) {
          const _e = e || { type, target: t };
          listener.c.call(t, _e);
        }
      }
    }
  },
  removeAllType(type) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    const list = this._listeners[_type];
    this.recoverLists = this.recoverLists.concat(dataToArray(list).filter(item =>
      item.n && item.n.match(namespaces)
    ));
    this.recoverLists.forEach(item => {
      this.removeEventListener(`${item.t}.${item.n}`, item.c);
    });
  },
  reAllType(type) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    this.recoverLists = this.recoverLists.map(item => {
      if (item.t === _type && item.n.match(namespaces)) {
        this.addEventListener(`${item.t}.${item.n}`, item.c);
        return null;
      }
      return item;
    }).filter(item => item);
  },
};
let event;
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  event = new EventDispatcher(window);
} else {
  event = new EventDispatcher();
}
export default event;

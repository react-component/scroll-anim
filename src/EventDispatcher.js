import { dataToArray } from './util';
function EventDispatcher(target) {
  this._listeners = {};
  this._eventTarget = target || {};
  this.recoverLists = [];
  this._listFun = {};
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

    list.splice(index, 0, { c: callback, n: namespaces, t: _type });
    if (!this._listFun[_type]) {
      this._listFun[_type] = this._listFun[_type] || this.dispatchEvent.bind(this, _type);
      if (this._eventTarget.addEventListener) {
        this._eventTarget.addEventListener(_type, this._listFun[_type], false);
      } else if (this._eventTarget.attachEvent) {
        this._eventTarget.attachEvent(`on${_type}`, this._listFun[_type]);
      }
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
          list.splice(i, 1);
          if (!list.length) {
            const func = this._listFun[_type];
            delete this._listeners[_type];
            delete this._listFun[_type];
            if (this._eventTarget.removeEventListener) {
              this._eventTarget.removeEventListener(_type, func);
            } else if (this._eventTarget.detachEvent) {
              this._eventTarget.detachEvent(`on${_type}`, func);
            }
          }
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

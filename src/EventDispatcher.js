import { dataToArray } from './util';

const scrollId = 'scroll-id';

function EventDispatcher(target) {
  this._listeners = {};
  this._eventTarget = target || {};
  this.recoverLists = [];
  this._listFun = {};
}
EventDispatcher.prototype = {
  addEventListener(type, callback, target) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    if (target && !target.getAttribute(scrollId)) {
      target.setAttribute(scrollId, (Date.now() + Math.random()).toString(32).replace('.', ''));
    }
    const listName = `${_type}${target ? `_${target.getAttribute(scrollId)}` : ''}`;
    let list = this._listeners[listName];
    let index = 0;
    let listener;
    let i;
    if (!list) {
      list = [];
      this._listeners[listName] = list;
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
    const $target = target || this._eventTarget;
    list.splice(index, 0, { c: callback, n: namespaces, t: _type });
    if (!this._listFun[listName]) {
      this._listFun[listName] = this._listFun[listName] || this.dispatchEvent.bind(this, { type: _type, target });
      if ($target.addEventListener) {
        $target.addEventListener(_type, this._listFun[listName], false);
      } else if ($target.attachEvent) {
        $target.attachEvent(`on${_type}`, this._listFun[listName]);
      }
    }
  },

  removeEventListener(type, callback, target, force) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    const listName = `${_type}${target ? `_${target.getAttribute(scrollId)}` : ''}`;
    const list = this._listeners[listName];
    let i;
    let _force = force;
    if (!namespaces) {
      _force = true;
    }
    if (list) {
      i = list.length;
      const $target = target || this._eventTarget;
      while (--i > -1) {
        if (list[i].c === callback && (_force || list[i].n === namespaces)) {
          list.splice(i, 1);
          if (!list.length) {
            const func = this._listFun[listName];
            delete this._listeners[listName];
            delete this._listFun[listName];
            if ($target.removeEventListener) {
              $target.removeEventListener(_type, func);
            } else if ($target.detachEvent) {
              $target.detachEvent(`on${_type}`, func);
            }
          }
          if (!_force) {
            return;
          }
        }
      }
    }
  },

  dispatchEvent({ type, target }, e) {
    const listName = `${type}${target ? `_${target.getAttribute(scrollId)}` : ''}`;
    const list = this._listeners[listName];
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
  removeAllType(type, target) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    const listName = `${_type}${target ? `_${target.getAttribute(scrollId)}` : ''}`;
    const list = this._listeners[listName];
    this.recoverLists = this.recoverLists.concat(dataToArray(list).filter(item =>
      item.n && item.n.match(namespaces)
    ));
    this.recoverLists.forEach(item => {
      this.removeEventListener(`${item.t}.${item.n}`, item.c, target);
    });
  },
  reAllType(type, target) {
    const types = type.split('.');
    const _type = types[0];
    const namespaces = types[1];
    this.recoverLists = this.recoverLists.map(item => {
      if (item.t === _type && item.n.match(namespaces)) {
        this.addEventListener(`${item.t}.${item.n}`, item.c, target);
        return null;
      }
      return item;
    }).filter(item => item);
  },
};
export default new EventDispatcher(typeof window !== 'undefined'
  && typeof document !== 'undefined' && window);;

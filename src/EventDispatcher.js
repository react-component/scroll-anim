function EventDispatcher(target) {
  this._listeners = {};
  this._eventTarget = target || this;
}
EventDispatcher.prototype = {
  addEventListener(type, callback) {
    const types = type.split('.').sort();
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
    list.splice(index, 0, {c: callback, n: namespaces, t: _type, func: func});
    if (this._eventTarget.addEventListener) {
      this._eventTarget.addEventListener(_type, func, false);
    } else if (this._eventTarget.attachEvent) {
      this._eventTarget.attachEvent('on' + _type, func);
    }
  },

  removeEventListener(type, callback, force) {
    const types = type.split('.').sort();
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
          if (this._eventTarget.removeEventListener) {
            this._eventTarget.removeEventListener(list.t, list.func);
          } else if (this._eventTarget.detachEvent) {
            this._eventTarget.detachEvent(list.t, list.func);
          }
          if (!_force) {
            return;
          }
        }
      }
    }
  },

  dispatchEvent(type) {
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
          listener.c.call(t, {type: type, target: t});
        }
      }
    }
  },
};

export default new EventDispatcher(window);

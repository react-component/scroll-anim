import { dataToArray } from './util';
var scrollId = 'scroll-id';

function EventDispatcher(target) {
  this._listeners = {};
  this._eventTarget = target || {};
  this.recoverLists = [];
  this._listFun = {};
}

EventDispatcher.prototype = {
  addEventListener: function addEventListener(type, callback, target, options) {
    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];

    if (target && !target.getAttribute(scrollId)) {
      target.setAttribute(scrollId, (Date.now() + Math.random()).toString(32).replace('.', ''));
    }

    var listName = "".concat(_type).concat(target ? "_".concat(target.getAttribute(scrollId)) : '');
    var list = this._listeners[listName];
    var index = 0;
    var listener;
    var i;

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

    var $target = target || this._eventTarget;
    list.splice(index, 0, {
      c: callback,
      n: namespaces,
      t: _type
    });

    if (!this._listFun[listName]) {
      this._listFun[listName] = this._listFun[listName] || this.dispatchEvent.bind(this, {
        type: _type,
        target: target
      });

      if ($target.addEventListener) {
        $target.addEventListener(_type, this._listFun[listName], options);
      } else if ($target.attachEvent) {
        $target.attachEvent("on".concat(_type), this._listFun[listName]);
      }
    }
  },
  removeEventListener: function removeEventListener(type, callback, target, force) {
    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];
    var listName = "".concat(_type).concat(target ? "_".concat(target.getAttribute(scrollId)) : '');
    var list = this._listeners[listName];
    var i;
    var _force = force;

    if (!namespaces) {
      _force = true;
    }

    if (list) {
      i = list.length;
      var $target = target || this._eventTarget;

      while (--i > -1) {
        if (list[i].c === callback && (_force || list[i].n === namespaces)) {
          list.splice(i, 1);

          if (!list.length) {
            var func = this._listFun[listName];
            delete this._listeners[listName];
            delete this._listFun[listName];

            if ($target.removeEventListener) {
              $target.removeEventListener(_type, func);
            } else if ($target.detachEvent) {
              $target.detachEvent("on".concat(_type), func);
            }
          }

          if (!_force) {
            return;
          }
        }
      }
    }
  },
  dispatchEvent: function dispatchEvent(_ref, e) {
    var type = _ref.type,
        target = _ref.target;
    var listName = "".concat(type).concat(target ? "_".concat(target.getAttribute(scrollId)) : '');
    var list = this._listeners[listName];
    var i;
    var t;
    var listener;

    if (list) {
      i = list.length;
      t = this._eventTarget;

      while (--i > -1) {
        listener = list[i];

        if (listener) {
          var _e = e || {
            type: type,
            target: t
          };

          listener.c.call(t, _e);
        }
      }
    }
  },
  removeAllType: function removeAllType(type, target) {
    var _this = this;

    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];
    var listName = "".concat(_type).concat(target ? "_".concat(target.getAttribute(scrollId)) : '');
    var list = this._listeners[listName];
    this.recoverLists = this.recoverLists.concat(dataToArray(list).filter(function (item) {
      return item.n && item.n.match(namespaces);
    }));
    this.recoverLists.forEach(function (item) {
      _this.removeEventListener("".concat(item.t, ".").concat(item.n), item.c, target);
    });
  },
  reAllType: function reAllType(type, target) {
    var _this2 = this;

    var types = type.split('.');
    var _type = types[0];
    var namespaces = types[1];
    this.recoverLists = this.recoverLists.map(function (item) {
      if (item.t === _type && item.n.match(namespaces)) {
        _this2.addEventListener("".concat(item.t, ".").concat(item.n), item.c, target);

        return null;
      }

      return item;
    }).filter(function (item) {
      return item;
    });
  }
};
export default new EventDispatcher(typeof window !== 'undefined' && typeof document !== 'undefined' && window);
;
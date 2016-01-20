let __mapped = {
  __arr: [],
};

export default{
  unMount() {
    __mapped = {__arr: []};
  },

  register(name, element) {
    __mapped[name] = element;
    __mapped.__arr.push(name);
  },

  unRegister(name) {
    __mapped.__arr.splice(__mapped.__arr.indexOf(name), 1);
    delete __mapped[name];
  },

  get(name) {
    return __mapped[name];
  },

  getMapped() {
    return __mapped;
  },
};

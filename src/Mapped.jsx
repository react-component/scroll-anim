let __mapped = {};

export default{
  unmount: ()=> {
    __mapped = {};
  },

  register: (name, element)=> {
    __mapped[name] = element;
  },

  unregister: (name)=> {
    delete __mapped[name];
  },

  get: (name)=> {
    return __mapped[name];
  },
};

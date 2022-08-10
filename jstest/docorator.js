@inject("Root")
class Root {
  constructor() {
    makeObservable(this);
  }
  @observable authorInfo = {
    name: "alien",
    mes: {
      say: "let us learn React!",
    },
  };
  @observable name = "《React进阶实践指南》";
  @action setName(newName) {
    this.name = newName;
  }
}
function observable(target, key, descriptor) {
  console.log(target);
  target[key + "111"] = "hhhhh";
}
function action(target) {
  console.log(target);
}

function inject(msg) {
  console.log(msg);
  return (target) => {
    console.log(target);
  };
}
new Root();
function makeObservable(target) {
  console.log(target);
}

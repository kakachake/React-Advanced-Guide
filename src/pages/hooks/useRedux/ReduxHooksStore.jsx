import { unstable_batchedUpdates } from "react-dom";

export class ReduxHooksStore {
  constructor(reducer, initState) {
    this.name = "__ReduxHooksStore__";
    this.id = 0;
    this.reducer = reducer;
    this.state = initState;
    this.mapConnects = {};
  }

  // 用于把ReduxHooksStore提供的核心方法传递给每一个useConnect
  exportStore() {
    return {
      dispatch: this.dispatch.bind(this),
      subscribe: this.subscribe.bind(this),
      unSubscribe: this.subscribe.bind(this),
      getInitState: this.getInitState.bind(this),
    };
  }

  // 该方法给自定义hooks的useConnect使用，用于获取初始化的state
  getInitState(mapStoreToState) {
    return mapStoreToState(this.state);
  }

  /**
   * 当state改变需要通知每一个使用useConnect的组件，这个方法就是通知更新，至于组件需不需要更新，
   * 那是useConnect内部需要处理的事情，这里还有一个细节，就是考虑到dispatch的出发场景可以时异步状态下，所以
   * 使用ReactDOM中的unstable_batchedUpdates开启批量更新原则。
   */
  publicRender() {
    unstable_batchedUpdates(() => {
      Object.keys(this.mapConnects).forEach((name) => {
        const { update } = this.mapConnects[name];
        update(this.state);
      });
    });
  }

  // 更新state，每一个使用useConnect的组件可以通过dispatch改变state
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    // state改变后通知各组件更新
    this.publicRender();
  }

  // 绑定每一个自定义hooks useConnect
  subscribe(connecCurrent) {
    const connectName = this.name + ++this.id;
    this.mapConnects[connectName] = connecCurrent;
    return connectName;
  }

  // 取消绑定
  unSubscribe(connectName) {
    delete this.mapConnects[connectName];
  }
}

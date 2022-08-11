import { unstable_batchedUpdates } from "react-dom";

/* 对外接口  */
const formInstanceApi = [
  "setCallback",
  "dispatch",
  "registerValidateFields",
  "resetFields",
  "setFields",
  "setFieldsValue",
  "getFieldsValue",
  "validateFieldValue",
  "getFieldValue",
  "validateFields",
  "submit",
  "unRegisterValidate",
];

const isReg = (value) => value instanceof RegExp;

export class FormStore {
  constructor(forceUpdate, defaultFormValue = {}) {
    this.ForceUpdate = forceUpdate;
    this.model = {};
    this.control = {};
    this.isSchedule = false;
    this.callback = {};
    this.penndingValidateQueue = [];
    this.defaultFormValue = defaultFormValue;
  }

  // 提供操作form的方法
  getForm() {
    return formInstanceApi.reduce((map, item) => {
      map[item] = this[item].bind(this);
      return map;
    }, {});
  }

  // 创建一个验证模块
  static createValidate(validate) {
    const { value, rule, required, message } = validate;
    return {
      value,
      rule: rule || (() => true),
      required: required || false,
      message: message || "",
      status: "pending",
    };
  }
  setCallback(callback) {
    if (callback) this.callback = callback;
  }
  // 触发事件
  dispatch(action, ...args) {
    if (!action || typeof action !== "object") return null;
    const { type } = action;
    if (~formInstanceApi.indexOf(type)) {
      return this[type](...args);
    } else if (typeof this[type] === "function") {
      return this[type](...args);
    }
  }
  // 注册表单单元项
  registerValidateFields(name, control, model) {
    if (this.defaultFormValue[name]) model.value = this.defaultFormValue[name];
    const validate = FormStore.createValidate(model);
    this.model[name] = validate;
    this.control[name] = control;
  }
  // 卸载注册表单元项
  unRegisterValidate(name) {
    delete this.model[name];
    delete this.control[name];
  }
  notifyChange(name) {
    const controller = this.control[name];

    if (controller) {
      controller?.changeValue();
    }
  }
  // 重置表单
  resetFields() {
    Object.keys(this.model).forEach((modelName) => {
      this.setValueClearStatus(this.model[modelName], modelName, null);
    });
  }
  setFields(fields) {
    if (typeof fields !== "object" || fields === null) return;
    Object.keys(fields).forEach((key) => {
      this.setFieldsValue(key, fields[key]);
    });
  }
  setFieldsValue(key, modelValue) {
    const model = this.model[key];
    if (!model) return false;
    if (typeof modelValue === "object") {
      const { message, rule, value } = modelValue;
      if (message) model.message = message;
      rule && (model.rule = rule);
      value && (model.value = value);
      model.status = "pending";
      this.validateFieldValue(key, true);
    } else {
      this.setValueClearStatus(model, key, modelValue);
    }
  }
  // 设置表单并清空状态
  setValueClearStatus(model, name, value) {
    model.value = value;
    model.status = "pending";
    this.notifyChange(name);
  }
  // 获取表单值
  getFieldsValue() {
    return Object.keys(this.model).reduce((ret, modelName) => {
      ret[modelName] = this.model[modelName].value;
      return ret;
    }, {});
  }
  //获取表单模型
  getFieldModel(name) {
    const model = this.model[name];
    return model ?? {};
  }
  // 获取对应字段名的值
  getFieldValue(name) {
    const model = this.model[name];
    if (!model && this.defaultFormValue[name])
      return this.defaultFormValue[name];
    return model ? model.value : null;
  }
  // 单一表单项验证
  validateFieldValue(name, forceUpdate = false) {
    const model = this.model[name];
    const lastStatus = model.status;
    if (!model) return null;
    const { required, rule, value } = model;
    let status = "resolve";
    if (required && !value) {
      status = "reject";
    } else if (isReg(rule)) {
      status = rule.test(value) ? "resolve" : "reject";
    } else if (typeof rule === "function") {
      status = rule(value) ? "resolve" : "reject";
    }
    model.status = status;
    if (lastStatus !== status || forceUpdate) {
      const notify = this.notifyChange.bind(this, name);
      this.penndingValidateQueue.push(notify);
    }
    this.scheduleValidate();
    return status;
  }
  scheduleValidate() {
    if (this.isSchedule) return;
    this.isSchedule = true;
    Promise.resolve().then(() => {
      unstable_batchedUpdates(() => {
        while (this.penndingValidateQueue.length) {
          let notify = this.penndingValidateQueue.shift();
          notify && notify();
        }
        this.isSchedule = false;
      });
    });
  }
  validateFields(callback) {
    let status = true;
    Object.keys(this.model).forEach((modelName) => {
      const modelStatus = this.validateFieldValue(modelName, true);
      if (modelStatus === "reject") status = false;
    });
    callback(status);
  }
  submit(cb) {
    this.validateFields((res) => {
      const { onFinish, onFinishFailed } = this.callback;
      cb && cb(res);
      if (!res)
        onFinishFailed &&
          typeof onFinishFailed === "function" &&
          onFinishFailed();
      onFinish &&
        typeof onFinish === "function" &&
        onFinish(this.getFieldsValue());
    });
  }
}

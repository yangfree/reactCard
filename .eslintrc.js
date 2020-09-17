module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 6
  },

  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // 输出
    "no-console": process.env.NODE_ENV === "production" ? 1 : 0,
    // bugger
    "no-debugger": process.env.NODE_ENV === "production" ? 1 : 0,
    // 禁止空语句块
    "no-empty": 1,
    // 禁止不必要的布尔转换
    "no-extra-boolean-cast": 2,
    // 禁止不必要的括号 //(a * b) + c;//报错
    "no-extra-parens": 1,
    // 禁止不必要的分号
    "no-extra-semi": 1,
    // 禁止对 function 声明重新赋值
    "no-func-assign": 1,
    // 禁止在字符串和注释之外不规则的空白
    // 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
    "no-obj-calls": 2,
    // 禁止直接使用 Object.prototypes 的内置属性
    "no-prototype-builtins": 0,
    // 禁止正则表达式字面量中出现多个空格
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    "no-unreachable": 2,
    // 要求使用 isNaN() 检查 NaN
    "use-isnan": 2,
    // 强制使用有效的 JSDoc 注释
    "valid-jsdoc": 1,
    // 强制 typeof 表达式与有效的字符串进行比较
    "valid-typeof": 2,

    //
    // 最佳实践 //
    //

    // 要求 return 语句要么总是指定返回的值，要么不指定
    "consistent-return": 0,
    // 强制所有控制语句使用一致的括号风格
    curly: [2, "all"],
    // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    "default-case": 1,
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, "allow-null"],
    // 要求 for-in 循环中有一个 if 语句
    "guard-for-in": 2,
    // 禁用 alert、confirm 和 prompt
    "no-alert": 0,
    // 禁止扩展原生类型
    "no-extend-native": 2,
    // 禁止不必要的 .bind() 调用
    "no-extra-bind": 2,
    // 禁用不必要的标签
    "no-extra-label:": 0,

    //
    // 变量声明 //
    //

    // 要求或禁止 var 声明中的初始化(初值)
    "init-declarations": 1,
    // 禁用特定的全局变量
    "no-restricted-globals": 0,
    // 禁止将变量初始化为 undefined
    "no-undef-init": 2,
    // 禁止将 undefined 作为标识符
    "no-undefined": 0,
    // 禁止出现未使用过的变量
    "no-unused-vars": [2, { vars: "all", args: "none" }],
    // 不允许在变量定义之前使用它们
    "no-use-before-define": 0,

    //
    // Node.js and CommonJS //
    //

    // 要求 require() 出现在顶层模块作用域中
    "global-require": 1,
    // 要求回调函数中有容错处理
    "handle-callback-err": [2, "^(err|error)$"],
    // 禁止混合常规 var 声明和 require 调用
    "no-mixed-requires": 0,
    // 禁止调用 require 时使用 new 操作符
    "no-new-require": 2,

    //
    // 风格指南 //
    //

    // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    "array-bracket-spacing": [2, "never"],
    // 禁止或强制在单行代码块中使用空格(禁用)
    "block-spacing": [1, "never"],
    //强制使用一致的缩进 第二个参数为 "tab" 时，会使用tab，
    "brace-style": [1, "1tbs", { allowSingleLine: true }],
    // 双峰驼命名格式
    camelcase: 1,

    //
    // ES6.相关 //
    //

    // 强制 generator 函数中 * 号周围使用一致的空格
    "generator-star-spacing": [2, { before: true, after: true }],
    // 禁止修改类声明的变量
    "no-class-assign": 2,
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 禁止类成员中出现重复的名称
    "no-dupe-class-members": 2,
    // 禁止 Symbol 的构造函数
    "no-new-symbol": 2,
    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    "no-this-before-super": 2
  }
};

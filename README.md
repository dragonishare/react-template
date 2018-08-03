# react-template

Add ESLint &amp; Prettier to VS Code for a Create React App
create-react-app 创建的带有代码规范检查和格式化的 react 模版

## Prerequisites

- Node.js v6.5 或以上，npm 随 node 一块安装

## 本项目所使用的版本

**当前时间 2018.7.28**

- Node.js v8.11.1
- npm 5.6.0
- yarn 1.9.2 (当前最新) [更多前往](https://yarnpkg.com/)

- create-react-app 1.5.2 (当前最新) [更多前往](https://github.com/facebook/create-react-app)
- antd v3.7.3（当前最新） [更多前往](https://ant.design/docs/react/introduce-cn)

### 使用本项目

```bash
# download code
git clone https://github.com/dragonishare/react-template.git

cd react-template

# 根据package.json安装所有的依赖库
yarn install

# 运行
yarn start

# build
yarn build
```

### 浏览器支持

> React 支持所有流行的浏览器，包括 Internet Explorer 9 及更高版本，尽管旧版浏览器（如 IE 9 和 IE 10）需要一些 polyfill。

> 我们不支持不支持 ES5 方法的旧版浏览器，但如果页面中包含 es5-shim 和 es5-sham 等 polyfill，您可能会发现您的应用程序可以在旧版浏览器中运行。 如果你选择走这条路，你就是独立的。

### vs code 编辑器配置 eslint 和 prettier, 开发时实时显示代码检查，保存时自动格式化

安装插件`eslint`,`Prettier - Code formatter`

User Settings 设置

```json
"editor.formatOnSave": true,
"[javascript]": {
  "editor.formatOnSave": false
},
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
```

# 从零开始搭建项目过程

## 通过官方脚手架新建项目

方法一：npx (npx comes with npm 5.2+ and higher)

```
npx create-react-app react-template
```

通用方法：如果使用的 npm 5.1 or earlier, 不能使用 npx. 需要全局安装`create-react-app`

```
npm install -g create-react-app

# 创建react-template项目
create-react-app react-template
```

方法二：npm (`npm init <initializer>` is available in npm 6+)

```
npm init react-app react-template
```

方法三：yarn (`yarn create` is available in Yarn 0.25+)

```
yarn create react-app react-template
```

以上方法会在当前文件夹下创建一个叫 react-template 文件夹，并初始化项目

### 文件夹结构

```
.
├── README.md
├── README.old.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── registerServiceWorker.js
└── yarn.lock
```

## 运行项目

```
cd react-template

yarn start
```

- 在浏览器通过http://localhost:3000访问
- 热加载，编辑之后保存自动 reload 刷新
- You will see the build errors and lint warnings in the console

## Build

`yarn run build`

## webpack 配置

通过`yarn run eject`命令把 create-react-app 所有内建的配置暴露出来

### 自动格式化代码配置 [formatting-code-automatically](<(https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically)>)

第一：添加依赖包

`yarn add husky lint-staged prettier --dev`

- husky makes it easy to use githooks as if they are npm scripts.
- lint-staged allows us to run scripts on staged files in git. See this blog post about lint-staged to learn more about it.
- prettier is the JavaScript formatter we will run before commits.

第二：添加完之后，package.json 做如下配置

```json
"scripts": {
   "start": "node scripts/start.js",
   "build": "node scripts/build.js",
   "test": "node scripts/test.js --env=jsdom",
   "precommit": "lint-staged"
 },
 "lint-staged": {
   "*.{js,jsx,json,css}": [
     "prettier --write",
     "git add"
   ]
 },
```

**以上两步已经可以按脚手架默认 eslint 规则格式化代码，（包括 jsx 缩进，默认是双引号，句末分号；css 缩进)**

第三：通过`.prettier`文件配置格式化规则

新增文件后直接配置，不需要额外其他的操作或插件

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "proseWrap": "preserve"
}
```

如果有什么问题，可以通过插件[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)，使用 ESLint 运行 Prettier，把 prettier 作为 eslint 的一条规则来执行的关联插件
在 package.json 中配置

```json
"eslintConfig": {
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

关闭 ESLint 的格式规则，当规则冲突时，禁用冲突的规则（当保留其他 Prettier 不关心的规则时）最简单的方式是使用[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "plugin:prettier/recommended"
  ]
},
```

第四：为了保证不同编辑器代码风格一致（缩进，tab 等），增加`.editorconfig`

```
# EditorConfig is awesome: https://EditorConfig.org
# EditorConfig helps developers define and maintain
# consistent coding styles between different editors and IDEs.

root = true

[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

为了是`.editorconfig`配置文件生效，需要编辑器安装对应的插件；这里是通过添加`.prettier`文件，让 prettier 读取`.editorconfig`里边的配置

### 添加 `less` 配置

使用`create-react-app`创建的项目默认不支持 `less`，需要做如下配置

第一：先暴露 webpack 相关的配置文件

`yarn run eject`

第二：安装 `less-loader` 和 `less`

`yarn add less less-loader --dev`

第三：修改`webpack`配置，`webpack.config.dev.js` 和 `webpack.config.prod.js` 配置文件

改动 1:
增加`/\.css$/,/\.less$/`,修改后如下

```
exclude: [
  /\.(js|jsx|mjs)$/,
  /\.html$/,
  /\.json$/,
  /\.css$/,
  /\.less$/
]
```

改动 2:

test: /\.css$/ 改为 /\.(css|less)$/
test: /\.css$/ 的 use 数组配置增加 less-loader

```
{
 test: /\.(css|less)$/,
 use: [
   require.resolve('style-loader'),
   {
     loader: require.resolve('css-loader'),
     options: {
       importLoaders: 1,
     },
   },
   {},
   {
     loader: require.resolve('less-loader'), // compiles Less to CSS
     options: { javascriptEnabled: true }
   }
 ],
},
```

**如果运行过程中发现有报 less 相关的错误，建议把（css|less）拆开两个规则**

### 添加 `antd` UI 库

第一：添加`antd`
当前版本 antd v3.7.3 [更多前往](https://ant.design/docs/react/introduce-cn)

`yarn add antd`

第二：装`babel-plugin-import`插件，实现按需加载组件代码和样式提高性能，但是需要对`webpack.config.dev.js`做修改

`yarn add babel-plugin-import --dev`

第三：本项目修改`package.json`文件修改,不直接修改`webpack.config.dev.js`

```json
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["import", { "libraryName": "antd", "style": true }]
  ]
},
```

第四：使用方法

`import { Button } from 'antd';`

# 补充知识

## npm

```
# 查看当前node版本
nvm current

# 显示所有安装的版本
nvm list

# 列出所需要的版本(所有可安装的node版本)
nvm list-remote

# 安装node版本
nvm install v8.11.1

# 切换版本
nvm use v8.11.1

# 切换版本也可以不带v
nvm use 8.11.1

# 设置默认版本
nvm alias default 8.11.1
```

## yarn

```
# 根据package.json安装全部的依赖
yarn install

# 安装packagenameA，安装 运行环境的依赖
yarn add packagenameA

#安装开发环境的依赖
yarn add --dev packagenameB

#卸载指定包packagenameC
yarn remove packagenameC
```

## tree

文件夹结构生成需要先安装 tree
`tree -L 3 -I "node_modules" > README.md`
展示除了"node_modules"文件夹外，其他文件夹三层级内容，然后导出到 README.md

⚠️ 导出到 README.md 的时候会清空原来的内容

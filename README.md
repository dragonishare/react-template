# react-template
Add ESLint &amp; Prettier to VS Code for a Create React App


## Prerequisites

* Node.js v6.5 或以上，npm随node一块安装

## 本项目所使用的版本

**当前时间2018.7.28**

* Node.js v8.11.1
* npm 5.6.0
* yarn 1.9.2 (当前最新)

* create-react-app 1.5.2 (当前最新)

## 通过官方脚手架新建项目

方法一：npx (npx comes with npm 5.2+ and higher)

```
npx create-react-app react-template
```

通用方法：如果使用的npm 5.1 or earlier, 不能使用npx. 需要全局安装`create-react-app`

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

以上方法会在当前文件夹下创建一个叫react-template文件夹，并初始化项目


### 运行项目

```
cd react-template

# 可以通过npm start or yarn start
yarn start

```

* 在浏览器通过http://localhost:3000访问
* 热加载，编辑之后保存自动reload刷新
* You will see the build errors and lint warnings in the console



## 补充知识

### npm

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


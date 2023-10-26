# doraemon道具模板工程

## 介绍
本工程利用qiankun子应用模式，可方便的集成到哆啦A梦的百宝箱中， 使得功能开发与解耦。

## 使用
1. clone该工程后即可编写自己的魔法道具
2. 修改package.json中的信息
   ``` json
      {
         "name": "gadget-template", // 道具的id
         "nickname": "模板道具", // 修改成你的道具名称
         "version": "0.0.1", // 版本
         "description": "这是一个示例插件，可参考此插件模板开发自己的插件", // 描述信息
         "icon": "https://avatars.githubusercontent.com/u/129379744?s=200&v=4",  // 道具的icon
         "homepage": "https://github.com/kaleai", // 道具的首页
         "bugs": {
            "url": "https://github.com/kaleai", // bug反馈地址
            "email": "kaleai@qq.com" // bug反馈的邮箱
         },
         "keywords": [
            "template",
            "demo",
            "example"
         ],
         "author": "kale", // 作者
         "license": "MIT"
      }
    ```
3. 在Controller中编写逻辑代码，return出来的数据会被View接收。比如，下方代码通过`data`抛出`md5Str`:
   ``` javascript
      public async handleAction({ action, expectation, values }: ActionInfoType): Promise<ActionHandleResultType> {
         switch (action) {
            case SYS_ACTION.INITIALIZATION: // 初始化的事件
               return {
                  sessionUUId: Math.random(), // id
                  viewElementInfos: [new SysViewElementInfo.ChatBox({ placeholder: 'please input some text' })],
                  canFeedback: false,
               }
            case SYS_ACTION.CHAT_BOX_SUBMIT:
               return {
                  sessionUUId: 'Math.random(),
                  viewElementInfos: [{ viewType: 'md5Text', data: { md5Str: md5(values.text) } }],
                  suggestActions: [{ label: '再次输入', actionInfo: { action: 'RE_INPUT' } }],
               }
            })
   }
   ```
4. 在View中吃Controller抛出的数据来展示UI。比如，下方代码获得`data`中的`md5Str`并展示：
   ``` javascript
   export default ({ viewType, data, onSendAction }: IViewElementProps) => {
     return viewType === 'md5Text' ? <span>{data.md5Str}</span> : <div />
   }
   ```
## 运行
在dev环境运行：
`
npm run dev
`

dev环境采用的配置文件是webapack.dev.config.js，如果需要修改dev环境的，就改这里的配置文件。

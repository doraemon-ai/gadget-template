import { ActionInfoType, ActionHandleResultType, SYS_ACTION, SysViewElementInfo, FeedbackInfoType, InstallProps } from '../Interface'
import md5 from 'js-md5'

class Controller {

  /**
   * 道具初始化时的回调
   */
  public async onCreate(props: InstallProps): Promise<any> {
    console.log('gid', props.gid) // dynamic id
    // localStorage.setItem(md5(props.gid + 'key_custom'), 'custom_value') // Private key
    return null
  }

  /**
   * 道具开始执行（可操作UI时）的回调
   */
  public async onStart(): Promise<any> {
    return null
  }

  /**
   * 被销毁时的回调
   */
  public async onDestroy(): Promise<any> {
    return null
  }

  /**
   * 接收用户反馈信息的方法
   */
  public handleFeedback(info: FeedbackInfoType) { /* handle user feedback */
  }

  /**
   * 处理来自UI或框架的各种Action的方法
   * @param action action的名字
   * @param expectation 期望执行的操作
   * @param values 传递的值
   * @return {Promise<unknown>} 抛出给UI的数据对象
   */
  public async handleAction({ action, expectation, values }: ActionInfoType): Promise<ActionHandleResultType> {
    console.log('handle action:', action, expectation, values)

    switch (action) {
      case SYS_ACTION.INITIALIZATION:
      case 'RE_INPUT':
        return {
          sessionUUId: 'id:' + Math.random(),
          viewElementInfos: [new SysViewElementInfo.ChatBox({ placeholder: 'please input some text' }, 'exp')],
          canFeedback: false,
        }
      case SYS_ACTION.CHAT_BOX_SUBMIT:
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
                sessionUUId: 'id:' + Math.random(),
                viewElementInfos: [{ viewType: 'md5Text', data: { md5Str: md5(values.text) } }],
                suggestActions: [{ label: '再次输入', actionInfo: { action: 'RE_INPUT' } }],
              },
            )
          }, 1000)
        })
      default:
        return { sessionUUId: '', viewElementInfos: [] }
    }
  }
}

export default new Controller()

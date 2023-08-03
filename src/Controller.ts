import { ActionInfoType, ActionHandleResultType, SYS_ACTION, SysViewElementInfo, FeedbackInfoType, InstallProps } from '../Interface'
import md5 from 'js-md5'

class Controller {

  public async onCreate(props: InstallProps): Promise<any> {
    console.log('gid', props.gid) // dynamic id
    // localStorage.setItem(md5(props.gid + 'key_custom'), 'custom_value') // Private key
    return null
  }

  public async onStart(): Promise<any> {
    return null
  }

  public async onDestroy(): Promise<any> {
    return null
  }

  public handleFeedback(info: FeedbackInfoType) { /* handle user feedback */
  }

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
          }, 240)
        })
      default:
        return { sessionUUId: '', viewElementInfos: [] }
    }
  }
}

export default new Controller()

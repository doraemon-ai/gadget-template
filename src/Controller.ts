import { ActionInfoType, ActionHandleResultType, SYS_ACTION_NAME, SysViewElementInfo, FeedbackInfoType } from '../Interface'
import { gid } from '../index'
const md5 = require('js-md5')

class Controller {

  public onCreate() { console.log('gid', gid) /* dynamic id */ }

  public onDestroy() {}

  public handleFeedback(info: FeedbackInfoType) { /* handle user feedback */ }

  public async handleAction({ action, expectation, values }: ActionInfoType): Promise<ActionHandleResultType> {
    console.log('handle action:', action, expectation, values)

    switch (action) {
      case SYS_ACTION_NAME.INITIALIZATION:
      case 'RE_INPUT':
        return {
          sessionUUId: 'id:' + Math.random(),
          viewElementInfos: [new SysViewElementInfo.ChatBox({ placeholder: 'please input some text' }, 'exp')],
          canFeedback: false,
        }
      case SYS_ACTION_NAME.CHAT_BOX_SUBMIT:
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

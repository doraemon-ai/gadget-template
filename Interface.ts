/**
 * @author Jack Tony
 * @date 2023/5/20
 */
export enum SYS_ACTION {
  INITIALIZATION = 'SYS_ACT:INITIALIZATION',
  CHAT_BOX_SUBMIT = 'SYS_ACT:CHAT_BOX_SUBMIT',
  GET_SELECTED_TEXT = 'SYS_ACT:GET_SELECTED_TEXT'
}

/**
 * 系统提供的View类型，以SYS_UI:开头
 */
export enum SYS_VIEW_TYPE {
  ERROR = 'SYS_UI:ERROR',
  CHAT_BOX = 'SYS_UI:CHAT_BOX',
  MARKDOWN = 'SYS_UI:MARKDOWN',
}

export type InstallProps = {
  onReceiveActionHandleResult?: (data: ActionHandleResultType) => void
  envInfo: Record<string, any>
  gid: string
  getView: (func: (props: IViewElementProps, id: string) => void) => void
  sendEvent: (func: (category: string, params: any) => void | Promise<any>) => void
}

export type ViewElementInfoType = {
  viewType: string // view类型。如：SYS_CHAT_BOX/SYS_MARKDOWN/...
  data: any // view 渲染所需的数据
  expectation?: string // 期望用户做的事情
}

export interface IViewElementProps extends ViewElementInfoType {
  containerId: string // view容器的id
  onSendAction: (actionInfo: ActionInfoType) => void
}

export type ActionInfoType = {
  action: string
  expectation?: string
  values?: any
}

export type FeedbackInfoType = {
  sessionUUId: string
  like: boolean
}

export type SuggestActionType = {
  label: string
  actionInfo: ActionInfoType
}

export type ActionHandleResultType = {
  sessionUUId: string
  canFeedback?: boolean // default: true
  viewElementInfos: ViewElementInfoType[]
  suggestActions?: SuggestActionType[]
}

export interface ISysErrorInfo {
  name: string
  message?: string
  code?: string
}

export interface ISysChatBox {
  placeholder?: string
}

export interface ISysMarkdown {
  content: string
}

abstract class AbsViewEleInfo<T> implements ViewElementInfoType {
  viewType: string
  data: T
  expectation?: string

  protected constructor(viewType: string, info: T, expectation?: string) {
    this.viewType = viewType
    this.data = info
    this.expectation = expectation
  }
}

export class SysViewElementInfo {

  static ErrorPanel = class cls extends AbsViewEleInfo<ISysErrorInfo> {
    constructor(info: ISysErrorInfo, expectation?: string) {
      super(SYS_VIEW_TYPE.ERROR, info, expectation)
    }
  }

  static ChatBox = class cls extends AbsViewEleInfo<ISysChatBox> {
    constructor(info: ISysChatBox, expectation?: string) {
      super(SYS_VIEW_TYPE.CHAT_BOX, info, expectation)
    }
  }

  static Markdown = class cls extends AbsViewEleInfo<ISysMarkdown> {
    constructor(info: ISysMarkdown, expectation?: string) {
      super(SYS_VIEW_TYPE.MARKDOWN, info, expectation)
    }
  }

}

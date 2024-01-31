/**
 * @author Jack Tony
 * @date 2023/5/20
 */
import { ComponentState, FunctionComponentElement, Key } from 'react'

/**
 * 系统提供的Action。均以SYS_ACT开头
 */
export enum SYS_ACTION {
  INITIALIZATION = 'SYS_ACT:INITIALIZATION',
  CHAT_BOX_SUBMIT = 'SYS_ACT:CHAT_BOX_SUBMIT',
  GET_SELECTED_TEXT = 'SYS_ACT:GET_SELECTED_TEXT'
}

/**
 * 系统提供的View类型。均以SYS_UI开头
 */
export enum SYS_UI_TYPE {
  ERROR = 'SYS_UI:ERROR',
  CHAT_BOX = 'SYS_UI:CHAT_BOX',
  MARKDOWN = 'SYS_UI:MARKDOWN',
}

export type InstallProps = {
  onReceiveActionHandleResult?: (data: ActionHandleResultType) => void
  envInfo: Record<string, any>
  gid: string
  parameters: object
  getView: (func: (props: IGadgetViewProps) => FunctionComponentElement<any>) => void
  sendEvent: (func: (category: string, params: any) => void | Promise<any>) => void
}

export type ViewElementInfoType = {
  viewType: string // view类型。如：SYS_CHAT_BOX/SYS_MARKDOWN/...
  data: ComponentState // view 渲染所需的数据
  needInteract?: boolean, // 是否需要用户编辑
  expectation?: string // 期望用户做的事情
}

export interface IGadgetViewProps extends ViewElementInfoType {
  sendAction: (actInfo: ActionInfoType) => void
  renderMarkdownView: (markdown: string) => FunctionComponentElement<any> | null
  isReadyOnly?: boolean
}

export type ActionInfoType = {
  action: string
  expectation?: string
  values?: Record<Key, any>
}

export type FeedbackInfoType = {
  sessionUUId: string
  like: boolean
}

export type SuggestionInfoType = {
  label: string
  actionInfo: ActionInfoType
}

export type ActionHandleResultType = {
  sessionUUId: string
  canFeedback?: boolean // default: false
  viewElementInfos: ViewElementInfoType[]
  suggestActions?: SuggestionInfoType[]
}

export interface SysErrorDataType {
  name: string
  message?: string
  code?: string
}

export interface SysChatBoxDataType {
  placeholder?: string
}

export interface SysMarkdownDataType {
  content: string
}

abstract class AbsViewEleInfo<Data> implements ViewElementInfoType {
  viewType: string
  data: Data
  expectation?: string
  needInteract: boolean

  protected constructor(viewType: string, data: Data, needInteract: boolean, expectation?: string) {
    this.viewType = viewType
    this.data = data
    this.needInteract = needInteract
    this.expectation = expectation
  }
}

export class SysViewElementInfo {

  static ErrorPanel = class cls extends AbsViewEleInfo<SysErrorDataType> {
    constructor(data: SysErrorDataType, expectation?: string) {
      super(SYS_UI_TYPE.ERROR, data, false, expectation)
    }
  }

  static ChatBox = class cls extends AbsViewEleInfo<SysChatBoxDataType> {
    constructor(data: SysChatBoxDataType, expectation?: string) {
      super(SYS_UI_TYPE.CHAT_BOX, data, true, expectation)
    }
  }

  static Markdown = class cls extends AbsViewEleInfo<SysMarkdownDataType> {
    constructor(data: SysMarkdownDataType, expectation?: string) {
      super(SYS_UI_TYPE.MARKDOWN, data, false, expectation)
    }
  }

}

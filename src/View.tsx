import { IViewElementProps } from '../Interface'

export default ({ viewType, data, expectation, onSendAction: sendAction }: IViewElementProps) => {
  return viewType === 'md5Text' ? <span>{data.md5Str}</span> : <div />
}

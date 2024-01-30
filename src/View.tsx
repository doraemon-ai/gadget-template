import { IGadgetViewProps } from '../Interface'

export const MD5_VIEW_TYPE = 'md5Text'

export default (props: IGadgetViewProps) => {
  const { viewType, data, expectation, sendAction, isReadyOnly } = props
  
  if (isReadyOnly) {
    return props.renderMarkdownView(data.md5Str)
  }
  return viewType === MD5_VIEW_TYPE ? <span style={{color:'blue'}}>{data.md5Str}</span> : <div />
}

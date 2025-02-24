import { h, VNode } from 'vue'

export default function isVueComponent(comp: any): boolean {
  if (comp == null || typeof comp !== 'object') {
    return false
  }

  const vnode: VNode = h(comp)

  if (!vnode.type) {
    return false
  }

  // Check if it's just an HTML Element
  if (typeof vnode.type === 'string') {
    return false
  }

  // A component that has render or setup property
  if (vnode.type.setup || vnode.type.render) {
    return true
  }

  // Check if functional component
  // https://vuejs.org/guide/extras/render-function.html#functional-components
  if (vnode.type.emits || vnode.type.props) {
    return true
  }
}

import { computed, createApp, h } from 'vue'

export default function renderComponentToString(component: any, props: any): Promise<string> {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    container.style.display = 'none'
    document.body.appendChild(container)

    const app = createApp({
      render() {
        return h(component, props)
      },
    })

    app.mount(container)

    setTimeout(() => {
      const htmlString = container.innerHTML
      app.unmount()
      container.remove()
      resolve(htmlString)
    }, 0)
  })
}

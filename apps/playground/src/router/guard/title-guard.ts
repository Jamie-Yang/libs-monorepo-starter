import type { Router } from 'vue-router'

export default function setupTitleGuard(router: Router) {
  router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} - libs-monorepo-template` : 'libs-monorepo-template'
  })
}

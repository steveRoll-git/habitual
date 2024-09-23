import { onMounted, watch, type WatchSource } from 'vue'

export type PageTitleOptions =
  | {
      root?: never
      /**
       * The title of the subpage, which can either be a string value or a watchable reactive value,
       * which will update `document.title` when changed.
       */
      subPageTitle: string | WatchSource<string>
    }
  | {
      /** Specifies that this is the site's root page. */
      root: true
    }

export const siteName = 'Habitual'

const subPageTitleTemplate = (subPageTitle: string) => `${subPageTitle} | ${siteName}`

export function usePageTitle(options: PageTitleOptions) {
  onMounted(() => {
    if (options.root) {
      document.title = siteName
    } else {
      if (typeof options.subPageTitle == 'string') {
        document.title = subPageTitleTemplate(options.subPageTitle)
      } else {
        watch(
          options.subPageTitle,
          (value) => {
            document.title = subPageTitleTemplate(value)
          },
          { immediate: true }
        )
      }
    }
  })
}

import { on, initState, go } from '../state/trade-federation'
import { current as vim } from '../core/neovim'
import { finder } from '../ai/update-server'

interface FilterResult {
  line: string,
  start: {
    line: number,
    column: number,
  },
  end: {
    line: number,
    column: number,
  }
}

export interface BufferSearch {
  value: string,
  options: string[],
  visible: boolean,
}

initState('bufferSearch', {
  options: [],
  visible: false,
  value: '',
} as BufferSearch)

export interface Actions {
  updateBufferSearchOptions: (options: string[]) => void,
  showBufferSearch: () => void,
  hideBufferSearch: () => void,
  updateBufferSearchQuery: (query: string) => void,
}

on.updateBufferSearchQuery((s, query) => {
  s.bufferSearch.value = query
  finder.request.query(vim.cwd, vim.file, query).then((results: FilterResult[]) => {
    console.log('filter results:', results)
    go.updateBufferSearchOptions(results.map(m => m.line))
  })
})

on.updateBufferSearchOptions((s, options) => s.bufferSearch.options = options)
on.showBufferSearch(s => s.bufferSearch.visible = true)
on.hideBufferSearch(s => s.bufferSearch.visible = false)
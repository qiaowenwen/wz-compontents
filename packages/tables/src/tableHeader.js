import Vue from 'vue'
import Utils from '../../Utils'
import ElCheckbox from 'element-ui/lib/checkbox'
import 'element-ui/lib/theme-chalk/checkbox.css'
import Popper from './poppers.vue'

export default {
  name: 'wz-table-header',
  components: { ElCheckbox },
  props: {
    store: {
      type: Object,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columnsLabels() {
      return this.store.states.header.label
    },
    columnsWidth() {
      return this.store.states.header.width
    },
    columnsProp() {
      return this.store.states.header.prop
    },
    columnsSortable() {
      return this.store.states.header.sortable
    },
    columnsFilterable() {
      return this.store.states.header.filterable
    },
    checkAll() {
      return (
        this.store.states.tableData.filter(item => !item.checked).length < 1
      )
    },
    getSortIndex() {
      return this.store.states.sortIndex
    }
  },
  methods: {
    checkAllEvent() {
      this.store.commit('toggleSelectAll')
      this.store.commit('swithCheckAll')
    },
    getThColumns() {
      const {
        columnsProp,
        columnsLabels,
        columnsWidth,
        columnsSortable,
        columnsFilterable,
        checkAllEvent,
        checkAll,
        checked,
        filterEvent,
        getSortIndex,
        sortBy
      } = this

      return columnsLabels.map((item, index) => {
        const style = { width: columnsWidth[index] }
        const checkStyle = {
          width: '2%',
          minWidth: '29px'
        }
        const checkboxEl = checked ? (
          <div class="wz-table-header-th" style={checkStyle}>
            <div class="table-header-th-label">
              <el-checkbox on-change={checkAllEvent} value={checkAll} />
            </div>
          </div>
        ) : null
        const headerEl = (
          <div class="wz-table-header-th" style={style}>
            <span class="table-header-th-label">{item}</span>
            {columnsSortable[index] ? (
              <span
                class={[
                  {
                    up: index === getSortIndex
                  },
                  'table-header-th-sort'
                ]}
                on-click={evt => sortBy(evt, index, columnsProp[index])}
              >
                <i class="fontfamily yd-icon-sort-up" />
                <i class="fontfamily yd-icon-sort-down" />
              </span>
            ) : null}
            {columnsFilterable[index] ? (
              <span class="table-header-th-filter" on-click={filterEvent}>
                <i class="fontfamily defuben" />
              </span>
            ) : null}
          </div>
        )
        return index < 1 ? [checkboxEl, headerEl] : headerEl
      })
    },
    filterEvent(evt) {
      const targetEl = evt.target.parentNode
      const popperElement = new Vue(Popper).$mount()
      popperElement.left = `${targetEl.getBoundingClientRect().left}px`
      popperElement.top = `${targetEl.getBoundingClientRect().top}px`
      document.body.appendChild(popperElement.$el)
      setTimeout(() => {
        popperElement.$el.setAttribute('data-status', 'pop')
      }, 20)
      if (Utils.hasClass(targetEl, 'filter-show')) {
        Utils.removeClass(targetEl, 'filter-show')
        return
      }
      Utils.addClass(targetEl, 'filter-show')
    },
    sortBy(evt, index, key) {
      const targetEl = evt.target.parentNode
      this.store.commit('setSortIndex', index)
      if (Utils.hasClass(targetEl, 'up')) {
        Utils.addClass(targetEl, 'down')
        Utils.removeClass(targetEl, 'up')
        // 正序
        this.store.commit('sortByData', {
          sortkey: key,
          reverse: -1
        })
        return
      }
      if (Utils.hasClass(targetEl, 'down')) {
        Utils.removeClass(targetEl, 'down')
        Utils.removeClass(targetEl, 'up')
        // 初始顺序
        this.store.commit('switchTableData')
        return
      }
      Utils.addClass(targetEl, 'up')
      // 倒序
      this.store.commit('sortByData', {
        sortkey: key,
        reverse: 1
      })
    }
  },
  render() {
    return <div class="wz-table-header-wrapper">{this.getThColumns()}</div>
  }
}

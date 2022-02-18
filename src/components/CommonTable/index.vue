<!--
  -
  - Changelog:
  - Revision 1.0 2021-03-04 wu jiajin
  - - 初始化
  -
  -
  -->

<template>
  <el-table
    ref="table"
    :check-strictly="false"
    :span-method="objectSpanMethod"
    :stripe="stripe"
    fit
    :lazy="lazy"
    :load="load"
    :border="border"
    :data="data"
    :height="tableHeight"
    :max-height="maxHeight"
    :row-key="getRowKeys"
    size="small"
    :row-style="rowStyle"
    :cell-style="cellStyle"
    :row-class-name="rowClassName"
    :header-row-class-name="headerrowClassName"
    :highlight-current-row="highlightCurrentRow"
    :default-expand-all="defaultExpandAll"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    @select="handleSelect"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    @row-click="handleRowClick"
    @filter-change="handleFilterChange"
  >
    <div v-if="$slots.empty" slot="empty" class="empty">
      <slot name="empty" />
    </div>

    <el-table-column
      v-if="showCheckbox"
      width="49"
      type="selection"
      :reserve-selection="true"
    />

    <!-- <el-table-column
      v-if="showIndex"
      :width="indexwidth"
      type="index"
      :fixed="indexFixed"
      :index="index"
      :resizable="false"
      header-align="center"
      align="center"
      label="序号"
    /> -->

    <template v-for="(v, k) of columns">
      <el-table-column
        v-if="v.buttons"
        :key="'col' + k"
        :resizable="resizable"
        :prop="v.prop"
        :label="v.label || '操作'"
        :fixed="v.fixed"
        :width="v.width || 150"
        :min-width="v.minWidth || 150"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
        :filters="v.filters"
        :column-key="v.prop"
      >
        <template slot-scope="scope">
          <template v-if="v.round">
            <!-- 为空时:透明,primary:蓝色,success为绿色,info:灰色,warning:橙色,danger:红色 -->
            <el-button
              v-for="(x, i) of v.buttons"
              :key="'btn' + i"
              :type="getType(v, scope.row)"
              round
              size="mini"
              plain
              @click="handleClick(x.onClick, scope.row)"
            >{{ getBtnText(x, scope.row) }}</el-button>
          </template>
          <template v-for="(x, i) of v.buttons" v-else-if="v.wordHide">

            <el-button
              v-if="
                getBtnText(x, scope.row) && scope.row.agreeSupplyStatus == 1
              "
              :key="'btn' + i"
              :disabled="handleDisabled(x, scope.row)"
              :fa="x.fa"
              :type="x.type"
              :icon="x.icon"
              @click="handleClick(x.onClick, scope.row)"
            >
              <span
                class="action-button"
                :style="{
                  color:
                    (x.color &&
                      (Object.prototype.toString.call(x.color) ===
                        '[object Function]'
                        ? x.color(scope.row)
                        : x.color)) ||
                    'rgba(52, 139, 245, 1)'
                }"
              >{{ getBtnText(x, scope.row) }}</span>
            </el-button>

            <el-button
              v-if="
                getBtnText(x, scope.row) == '查看活动' &&
                  scope.row.agreeSupplyStatus != 1
              "
              :key="'btn' + i"
              :disabled="handleDisabled(x, scope.row)"
              :fa="x.fa"
              :type="x.type"
              :icon="x.icon"
              @click="handleClick(x.onClick, scope.row)"
            >
              <span
                class="action-button"
                :style="{
                  color:
                    (x.color &&
                      (Object.prototype.toString.call(x.color) ===
                        '[object Function]'
                        ? x.color(scope.row)
                        : x.color)) ||
                    'rgba(52, 139, 245, 1)'
                }"
              >{{ getBtnText(x, scope.row) }}</span>
            </el-button>
          </template>
          <template v-for="(x, i) of v.buttons" v-else>
            <el-button
              v-if="getBtnText(x, scope.row)"
              :key="'btn' + i"
              :disabled="handleDisabled(x, scope.row)"
              :fa="x.fa"
              :type="x.type"
              :icon="x.icon"
              @click="handleClick(x.onClick, scope.row)"
            >
              <span
                class="action-button"
                :style="{
                  color:
                    (x.color &&
                      (Object.prototype.toString.call(x.color) ===
                        '[object Function]'
                        ? x.color(scope.row)
                        : x.color)) ||
                    'rgba(52, 139, 245, 1)'
                }"
              >{{ getBtnText(x, scope.row) }}</span>
            </el-button>
          </template>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.type === 'textColor'"
        :key="'textColor' + k"
        :show-overflow-tooltip="true"
        :label="v.label"
        :fixed="v.fixed"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :resizable="resizable"
        :sortable="v.sortable"
        :filters="v.filters"
        :filter-method="v.filterMethod"
        :width="v.width"
        :column-key="v.prop"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <strong
            class="text-overflow"
            :class="{
              cursor: v.cursor,
              'text-normal': v.textNormal,
              underline: v.underline
            }"
            :style="{
              color: `${getColor(v, scope.row) || 'rgba(52, 139, 245, 1)'}`
            }"
            @click="handleClick(v.onClick, scope.row)"
          >
            {{ getColorText(v, scope.row) }}
          </strong>

          <br v-if="getDescText(v, scope.row)">
          <span v-if="getDescText(v, scope.row)">
            {{ getDescText(v, scope.row) }}
          </span>
          <div v-if="getDescTextSecond(v, scope.row)">
            {{ getDescTextSecond(v, scope.row) }}
          </div>
          <div v-if="getDescTextThird(v, scope.row)">
            {{ getDescTextThird(v, scope.row) }}
          </div>
          <div v-if="getDescTextProgress(v, scope.row)">
            <el-progress
              style="display: inline-block;width:80%;margin-right:4px;"
              :text-inside="true"
              :stroke-width="24"
              :percentage="parseFloat(getDescTextProgress(v, scope.row))"
              status="success"
            />
            <span>{{ getDescTextProgress(v, scope.row) }}%</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.type === 'colorTag' && v.filters !== undefined"
        :key="'colorTag' + k"
        :filter-multiple="v.multiple === undefined"
        :filters="v.filters"
        :filter-method="v.filterMethod || filterHandler"
        filter-placement="bottom-end"
        :label="v.label"
        :fixed="v.fixed"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :resizable="resizable"
        :sortable="v.sortable"
        :width="v.width"
        :column-key="v.prop"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="getTypeTool(v, scope.row, 'isBorder')"
            :effect="getTypeTool(v, scope.row, 'effect')"
            :type="getTypeTool(v, scope.row, 'tagType')"
          >
            {{ getBtnText(v, scope.row) }}
          </el-tag>
          <div
            v-else
            :class="
              `su-tabele-tag su-tabele-tag-${getTypeTool(
                v,
                scope.row,
                'tagType'
              )}`
            "
          >
            {{ getBtnText(v, scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="v.type === 'colorTag' && v.filters === undefined"
        :key="'colorTag' + k"
        :label="v.label"
        :fixed="v.fixed"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :resizable="resizable"
        :sortable="v.sortable"
        :width="v.width"
        :column-key="v.prop"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="getTypeTool(v, scope.row, 'isBorder')"
            :effect="getTypeTool(v, scope.row, 'effect')"
            :type="getTypeTool(v, scope.row, 'tagType')"
          >
            {{ getBtnText(v, scope.row) }}
          </el-tag>
          <div
            v-else
            :class="
              `su-tabele-tag su-tabele-tag-${getTypeTool(
                v,
                scope.row,
                'tagType'
              )}`
            "
          >
            {{ getBtnText(v, scope.row) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.type === 'textButton'"
        :key="'textButton' + k"
        :label="v.label"
        :fixed="v.fixed"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :resizable="resizable"
        :sortable="v.sortable"
        :width="v.width"
        :column-key="v.prop"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <el-button
            v-if="!v.clickable || v.clickable(scope.row)"
            @click="handleClick(v.onClick, scope.row)"
          >
            <span
              class="action-button"
              :style="{ color: v.color || 'rgba(52, 139, 245, 1)' }"
            >
              {{ getText(v, scope.row) }}</span>
          </el-button>

          <span v-else> {{ getText(v, scope.row) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.isIcon"
        :key="v.prop + k"
        :fixed="v.fixed"
        :formatter="v.formatter"
        :resizable="resizable"
        :label="v.label"
        :min-width="v.minWidth || 100"
        :width="v.width"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <i
            :class="v.icon"
            style="cursor: pointer"
            @click="handleClick(v.onClick, scope.row)"
          />
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.icon"
        :key="v.prop + k"
        :class-name="v.class"
        :fixed="v.fixed"
        :formatter="v.formatter"
        :label="v.label"
        :resizable="resizable"
        :min-width="v.minWidth || 100"
        :width="v.width"
        :show-overflow-tooltip="v.showOverflowTooltip || true"
        :sortable="v.sortable"
        :filters="v.filters"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <div
            :style="
              `display:flex;align-items:center;justify-content:${
                v.align === 'right' ? 'flex-end' : 'flex-start'
              }`
            "
          >
            <img :src="getUrl(v, scope.row)" style="height: 12px">
            <div
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-left: 10px;
              "
            >
              {{ getText(v, scope.row) }}
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.showPhotos"
        :key="v.prop + k"
        :class-name="v.class"
        :fixed="v.fixed"
        :formatter="v.formatter"
        :label="v.label"
        :resizable="resizable"
        :min-width="v.minWidth || 100"
        :show-overflow-tooltip="
          v.showOverflowTooltip !== undefined ? v.showOverflowTooltip : true
        "
        :sortable="v.sortable"
        :width="v.width"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <img
            v-for="(url, index1) in getPhotos(v, scope.row)"
            :key="index1"
            :src="url"
            class="photo"
            @click="photoClick(url)"
          >
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.showImage"
        :key="v.prop + k"
        :class-name="v.class"
        :fixed="v.fixed"
        :formatter="v.formatter"
        :label="v.label"
        :resizable="resizable"
        :min-width="v.minWidth || 100"
        :sortable="v.sortable"
        :width="v.width"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <img
            :src="getPhotos(v, scope.row)"
            :width="v.minWidth || 80"
          >
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.isFilter"
        :key="v.prop + k"
        :fixed="v.fixed"
        :formatter="v.formatter"
        :label="v.label"
        :resizable="resizable"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :show-overflow-tooltip="v.showOverflowTooltip || true"
        :sortable="v.sortable"
        :width="v.width"
        :column-key="v.prop"
        :filter-multiple="v.multiple === undefined"
        :filters="v.filters"
        :filter-method="v.filterMethod || filterHandler"
        filter-placement="bottom-end"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      />

      <el-table-column
        v-else-if="v.type === 'popover'"
        :key="'slot' + k"
        :label="v.label"
        :fixed="v.fixed"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :sortable="v.sortable"
        :resizable="resizable"
        :width="v.width"
        :column-key="v.prop"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.showPopovers"
            class="popover-container"
            :trigger="v.trigger"
            :placement="v.placement"
          >
            <div
              v-for="(item, index2) in scope.row.popovers"
              :key="index2"
              class="popover-item"
            >
              {{ item }}
            </div>
            <div slot="reference">{{ scope.row[v.prop] }}</div>
          </el-popover>
          <div v-if="!scope.row.showPopovers">{{ scope.row[v.prop] }}</div>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.type === 'longtooltip'"
        :key="'slot' + k"
        :label="v.label"
        :fixed="v.fixed"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :sortable="v.sortable"
        :resizable="resizable"
        :width="v.width"
        :column-key="v.prop"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <el-popover
            width="400"
            class="longtooltip"
            :trigger="v.trigger"
            :placement="v.placement"
          >
            <div>{{ getText(v, scope.row) }}</div>
            <div
              slot="reference"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
              class="longtooltip-word"
            >
              {{ getText(v, scope.row) }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.type === 'slot'"
        :key="'slot' + k"
        :label="v.label"
        :fixed="v.fixed"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :sortable="v.sortable"
        :resizable="resizable"
        :width="v.width"
        :column-key="v.prop"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          <slot :name="v.slotID" :item="scope.row" :index="scope.$index" />
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="v.headicon === 'el-icon-question'"
        :key="v.prop + k"
        :class-name="v.class"
        :fixed="v.fixed"
        :resizable="resizable"
        :formatter="v.formatter"
        :label="v.label"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :show-overflow-tooltip="v.showOverflowTooltip || true"
        :sortable="v.sortable"
        :width="v.width"
        :column-key="v.prop"
        :filter-multiple="v.multiple === undefined"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
        :render-header="iconsQuestion"
      >
        <template slot-scope="scope">
          {{ getText(v, scope.row) }}
        </template>
      </el-table-column>

      <el-table-column
        v-else
        :key="v.prop + k"
        :class-name="v.class"
        :fixed="v.fixed"
        :resizable="resizable"
        :formatter="v.formatter"
        :label="v.label"
        :min-width="v.minWidth || 100"
        :prop="v.prop"
        :show-overflow-tooltip="v.showOverflowTooltip || true"
        :sortable="v.sortable"
        :width="v.width"
        :column-key="v.prop"
        :filter-multiple="v.multiple === undefined"
        :align="v.align || 'left'"
        :header-align="v.headerAlign || 'left'"
      >
        <template slot-scope="scope">
          {{ getText(v, scope.row) }}
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { questionData } from './question'

import { getMenuList } from '../../utils/auth'
export default {
  name: 'CommonTable',
  props: {
    indexwidth: {
      type: String,
      default: () => {
        return '62'
      }
    },
    resizable: {
      type: Boolean,
      default: true },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: false
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    indexFixed: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: String,
      default: ''
    },
    load: {
      type: Function,
      default: () => {}
    },
    index: {
      type: Function,
      default(index) {
        return index + 1
      }
    },
    maxHeight: {
      type: String,
      default: () => 'auto'
    },
    selectable: {
      type: Function,
      default() {
        return true
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    cellStyle: {
      type: Function,
      default() {
        return () => {}
      }
    },
    rowStyle: {
      type: Function,
      default() {
        return () => {}
      }
    },
    rowClassName: {
      type: Function,
      default: () => {
        return 'row-defalut-class'
      }
    },
    headerrowClassName: {
      type: Function,
      default: () => {
        return 'header-defalut-row-class'
      }
    },
    objectSpanMethod: {
      type: Function,
      default: () => {}
    },
    multipleSelection: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableHeight: null
    }
  },
  computed: {
    table() {
      return this.$refs.table
    }
  },
  watch: {
    height(val) {
      if (!(navigator.userAgent.toLocaleLowerCase().indexOf('qqbrowse') > -1)) {
        this.tableHeight = val
      }
    }
  },
  mounted() {
    if (!(navigator.userAgent.toLocaleLowerCase().indexOf('qqbrowse') > -1)) {
      this.tableHeight = this.height
    }
    // this.setDefaultSelection(this.multipleSelection)
    console.log(this.multipleSelection, 2354365)
    this.multipleSelection.forEach(item => {
      this.$refs.table.toggleRowSelection(item, true)
    })
  },
  methods: {
    getRowKeys(row) {
      return row.id
    },
    iconsQuestion(h, { column }) {
      const inReviews = questionData[column.label]
      return h('div', [
        h('span', column.label),
        h(
          'el-tooltip',
          {
            props: {
              placement: 'top'
            }
          },
          [
            h(
              'div',
              {
                slot: 'content',
                style: {
                  width: '250px',
                  whiteSpace: 'normal',
                  'margin-bottom': '10px',
                  'white-space': 'pre-wrap'
                }
              },
              inReviews
            ),
            h('i', {
              class: 'el-icon-question',
              style: 'margin-left:5px;'
            })
          ]
        )
      ])
    },

    setDefaultSelection(e) {
      this.$refs.table.toggleRowSelection(e, true)
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    clearFilter(filters) {
      this.$refs.table.clearFilter(filters)
    },
    clearSort() {
      this.$refs.table.clearSort()
    },
    doLayout() {
      this.$refs.table.doLayout()
    },
    handleSelect(rows, row) {
      this.$emit('select', rows, row)
    },
    handleSelectionChange(rows) {
      this.$emit('selection-change', rows)
    },
    handleSortChange(column) {
      this.$emit('sort-change', column)
    },
    handleFilterChange(filter) {
      this.$emit('handle-filter-change', filter)
    },
    handleRowClick(row) {
      row.flag = !row.flag
      this.$refs.table.toggleRowSelection(row)
      this.$emit('row-click', row)
    },
    handleClick(callback = () => {}, row) {
      callback(row)
    },
    handleDisabled(opts = {}, row = {}) {
      const { disabled, permission } = opts

      const menuList = getMenuList()
      const menu = menuList && menuList.length && menuList[0] || []
      const isAllow = []
      this.checkPermission(permission, menu, isAllow)
      const isPermission = permission && isAllow.every(elm => !elm)

      return disabled instanceof Function ? disabled(row) : (!!isPermission || disabled)
    },
    checkPermission(permission, menu, isAllow) {
      // 权限检查暂定修改
      if (menu) {
        if (menu.permissionList) {
          for (const item of menu.permissionList) {
            this.checkPermission(permission, item, isAllow)
          }
        }
        isAllow.push(menu.descr === permission)
      }
    },
    filterHandler(value, row, column) {
      const property = column['property']
      this.$emit('filter-change', { key: property, value })

      return row[property] === value
    },
    getUrl(opts = {}, row = {}) {
      const { icon } = opts
      return icon instanceof Function ? icon(row) : icon
    },
    getBtnText(opts = {}, row = {}) {
      const { text } = opts
      return text instanceof Function ? text(row) : text
    },
    getType(opts = {}, row = {}) {
      const { type } = opts
      return type instanceof Function ? type(row) : type
    },

    getTypeTool(opts = {}, row = {}, typeStr) {
      const type = opts[typeStr]
      return type instanceof Function ? type(row) : type
    },

    getColor(opts = {}, row = {}) {
      const { color } = opts
      return color instanceof Function ? color(row) : color
    },
    getText(opts = {}, row = {}) {
      const { text } = opts
      return text instanceof Function ? text(row) : row[opts.prop]
    },
    getDescText(opts = {}, row = {}) {
      const { descTest } = opts
      return descTest instanceof Function ? descTest(row) : ''
    },
    getDescTextSecond(opts = {}, row = {}) {
      const { getDescTextSecond } = opts
      return getDescTextSecond instanceof Function
        ? getDescTextSecond(row)
        : ''
    },
    getDescTextThird(opts = {}, row = {}) {
      const { getDescTextThird } = opts
      return getDescTextThird instanceof Function ? getDescTextThird(row) : ''
    },
    // 获取进度条
    getDescTextProgress(opts = {}, row = {}) {
      const { getDescTextProgress } = opts
      return getDescTextProgress instanceof Function
        ? getDescTextProgress(row)
        : ''
    },
    // 获取图片Url
    getPhotos(opts = {}, row = {}) {
      return row[opts.prop]
    },
    // 点击图片显示
    photoClick(file) {
      console.log(file)
    },
    getColorText(opts = {}, row = {}) {
      const { text } = opts
      if (text) {
        return text(row)
        // console.log(opts,row)
      } else {
        return row[opts.prop]
      }
    },
    filterDefaultMethod() {}
  }
}
</script>

<style lang="sass" scoped>
.action-button
  font-size: 0.9rem
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif

.el-button.is-disabled.el-button--text ::v-deep
  > span
    > span
      color: #888!important

.photo
  margin-right: 5px
  height: 20px
  width: 20px
  cursor: pointer
</style>
<style lang="scss" scoped>

::v-deep .el-button {
  margin-left: 10px;
  margin-right: 10px;
}
.cursor {
  cursor: pointer;
}
.text-normal {
  font-weight: normal !important;
}
.underline {
  text-decoration: underline;
}
.text-overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

::v-deep .el-table__fixed {
  height: 100% !important;
}

::v-deep .el-table__fixed {
  height: 100% !important;
}
.longtooltip {
  width: 300px;
}
.longtooltip-word {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon-column {
  display: flex;
  justify-content: space-between;
}
</style>

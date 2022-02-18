<template>
  <el-dialog
    title="新增使用门店"
    :visible.sync="dialogVisible"
    width="50%"
    custom-class="region-dialog"
    :before-close="handleClose"
    show-close
  >
    <el-input
      :placeholder="placeHolder"
      v-model="filterText"
      @change="newFilter"
    >
    </el-input>
    <el-checkbox v-model="selectAll">全部</el-checkbox>
    <el-tree
      ref="tree"
      :data="tdata"
      show-checkbox
      default-expand-all
      node-key="name"
      highlight-current
      :props="defaultProps"
      @check="checkchange"
      :filter-node-method="filterNode"
    />
  </el-dialog>
</template>

<script>
import stringify from "qs/lib/stringify";
import { Level } from "chalk";
import sduqMethod from "../../mixin/sduqMethod";
export default {
  name: "CommonRegionstreeDialog",
  components: {},
  mixins: [sduqMethod],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    defaultData: {
      /**
       * 父组件中目前已选中的数据集，包含大区和营运区，有两种区分方式:
       * 1-bigRegion和region； 2-isbigRegion
       * 注:全选子节点会自动选中父节点，不用担心使用filterAll遗漏大区节点的修改
       */
      type: Array,
      default: () => [],
    },
    defaultUrl: {
      type: String,
      default: "groupbuying/getOrganization",
    },
    placeHolder: {
      type: String,
      default: "输入关键字进行过滤",
    },
  },
  data() {
    return {
      defaultProps: {
        children: "operatingAreas",
        label: "name",
      },
      treeData: [],
      //allNode包含大区和营运区，通过字段名区分:bigRegion和region
      allNodeKey: [],
      allNodeData: [],
      selectAll: false,
      tdata: [], //只在查询时修改
      filterText: undefined, //过滤
      //filterALL仅包含当前显示的营运区，不包含大区
      filterAllNodeKey: [],
      filterAllNodeData: [],
      loading: null,
    };
  },
  watch: {
    selectAll(val) {
      if (this.filterText) {
        //有过滤条件，需要使用filterAllNodeKey和filterAllNodeData，并在选择或取消时先判断是否已存在

        //当前父级已有营运区名的集合字符串
        const regionStr = [...this.defaultData]
          .filter((elm) => !elm.isbigRegion && elm.regionName)
          .map((res) => res.regionName)
          .join(",");
        const nodesdata = [...this.defaultData];

        console.log("当前条件下的this.defaultData", this.defaultData);
        console.log(
          "当前条件下的this.filterAllNodeData",
          this.filterAllNodeData
        );

        if (val) {
          for (let node of this.filterAllNodeData) {
            if (!regionStr.includes(node.regionName)) {
              nodesdata.push(node);
            }
          }
          this.$emit("nodechange", nodesdata, true);
          //
          this.$refs.tree.setCheckedKeys(this.filterAllNodeKey);
        } else {
          console.log("需要取消的营业区", regionStr, this.filterAllNodeData);
          for (let node of this.filterAllNodeData) {
            const index = regionStr.includes(node.regionName);
            if (index) {
              console.log(`${node.regionName} 存在于当前树中，需取消`);
              let position = 0;
              for (; position < nodesdata.length; position++) {
                if (node.regionName === nodesdata[position].regionName) {
                  nodesdata.splice(position, 1);
                  position--;
                }
              }
            }
          }
          this.$emit("nodechange", nodesdata, false);

          const newSetKeys = nodesdata.map((obj) => {
            return obj.regionName;
          });
          this.$refs.tree.setCheckedKeys(newSetKeys);
        }
      } else {
        //没有过滤条件，则不需要使用filterAllNode
        if (val) {
          const keys = [...this.allNodeKey];
          this.$refs.tree.setCheckedKeys(keys);
          const nodesdata = [...this.allNodeData];
          this.$emit("nodechange", nodesdata, true);
        } else {
          this.$emit("nodechange", []);
          //如果有部分节点未取消选中, 考虑存在node-key不唯一的情况
          this.$refs.tree.setCheckedKeys([]);
          // this.allNodeKey.forEach(key => {

          //   this.$refs.tree.setChecked(key, true,false)
          // });
        }
      }
    },

    defaultData(val) {
      console.log("捕捉到defaultData的变化", val);
    },

    dialogVisible(val) {
      this.$nextTick(() => {
        const defaultKey = this.defaultData.map(
          (res) => res.bigRegionName || res.regionName
        );
        this.$refs.tree.setCheckedKeys(defaultKey);
      });
    },
    // filterText(val) {
    //   this.filterAllNodeKey=[], this.filterAllNodeData=[]
    //   this.$refs.tree.filter(val);
    //   console.log(
    //         "当前搜索范围内的全选值:",
    //         this.filterAllNodeKey,
    //         this.filterAllNodeData
    //       );
    // },
  },
  mounted() {
    this.query();
  },
  methods: {
    newFilter() {
      (this.filterAllNodeKey = []), (this.filterAllNodeData = []);
      this.$refs.tree.filter(this.filterText);
      console.log(
        "当前搜索范围内的全选值:",
        this.filterAllNodeKey,
        this.filterAllNodeData
      );
    },
    handleClose() {
      // console.log(
      //   "看看筛选后全选得到的key和data",
      //   this.filterAllNodeKey,
      //   this.filterAllNodeData
      // );
      // console.log("看看父级现在的defaultData", this.defaultData);
      this.$emit("update:dialogVisible", false);
    },
    checkchange(data, node) {
      //仅通过手动点击触发, nodechange作用为传值给父级供其生成营运区合集字符串
      console.log("触发复选框选中事件", data, node);
      const nodes = node.checkedNodes.map((res) => {
        const isbigRegion = Object.prototype.hasOwnProperty.call(
          res,
          "operatingAreas"
        );
        return {
          isbigRegion,
          regionName: res.name,

          regionCode: res.num,
        };
      });

      this.$emit("nodechange", nodes);
    },

    filterNode(value, data, node) {
      //修改过滤词段filterText将触发该函数，判断并修改所有节点的显示状态

      if (!value) return true;

      // console.log("看看value和data和node？", value, data, node);
      // console.log(`当前节点的名称: ${data.name},等级: ${node.level}, 展开状态: ${node.expanded}, 子节点数${node.childNodes.length}`)
      let showThisNode = false; //是否为需显示的叶子节点
      if (data.name.indexOf(value) !== -1) {
        //本节点含有搜索词, 不是叶子节点则直接返回，是叶子节点则修改标记值
        if (node.childNodes.length === 0) {
          showThisNode = true;
        } else {
          // console.log("非叶子节点含有搜索词", data.name, node);
          return true;
        }
      }
      //如果没有搜索词且节点为一级节点，则直接返回，否则逐级检查父节点有无搜索词
      if (node.level === 1) {
        // console.log("一级节点无关键词", data.name);
        return false;
      }
      let parentData = node.parent;
      let i = 0;
      for (; i < node.level - 1; i++) {
        if (parentData.data.name.indexOf(value) !== -1) {
          showThisNode = true;
          break;
        }
        // 否则的话再往上一层做匹配
        parentData = parentData.parent;
      }
      if (showThisNode) {
        console.log("需载入的叶子节点", data.name);
        // 如果该节点需要显示且为叶子节点，则为当前全选范围内的营业区
        this.filterAllNodeKey.push(data.name);
        this.filterAllNodeData.push({
          regionName: data.name,
          regionCode: data.num,
        });
      }
      //  else if (i === node.level - 1) {
      // console.log("整条分支无关键词", node);
      // }
      return showThisNode;
    },

    async query() {
      this.loading = this.$loading({ fullscreen: true });
      const getOrganization = this.curryingApi(this.defaultUrl, "get");
      const res = await getOrganization();
      this.loading.close();
      // console.log("看看原始数据", res.data);
      this.tdata = res.data.map((res) => {
        this.allNodeData.push({
          bigRegionCode: res.num,
          bigRegionName: res.name,
        });
        this.allNodeKey.push(res.name);

        res.operatingAreas.forEach((elm, index) => {
          this.allNodeKey.push(elm.name);
          this.allNodeData.push({
            regionName: elm.name,
            regionCode: elm.num,
          });
        });

        const newres = { ...res };
        newres.yyqName = res.dqName;
        return newres;
      });

      console.log("给我看看树的数据", this.tdata);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  overflow: auto;
  height: 50vh !important;
}
</style>

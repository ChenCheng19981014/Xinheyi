<template>
  <div class="workShop" ref="workShop" onselectstart="return false;">
    <div @pointerdown="(e) => e.stopPropagation()" class="btn">
      <button @click="backToScene">返回首页</button>
    </div>
  </div>
</template>

<script>
// chang 事件 实例
let sceneChange = null;
// 场景
let runScene = null;
import { RunScene, Utils } from "run-scene-v2";
import bus from "./../../../lib/bus";
import * as THREE from "three";
import { fn } from "./fn";
import store from "../../../store/index";
export default {
  name: "WorkShop",
  data() {
    return {
      modelName: null,
      color: null,
      state: false,
    };
  },
  mounted() {
    // 加载场景
    this.loadScene();
    // 打印点击的模型接口
    bus.$on("logClickModel", this.logClickModel);
  },
  methods: {
    // 返回主场景
    backToScene() {
      bus.$emit("change-scene", "ThreeScene");
    },

    // 加载场景
    loadScene() {
      runScene = new RunScene({
        coverSameId: true,
        instanceClone: false,
        render3: true,
        // render2: true,
        renderConfig: {
          // 是否允许设置模型位置后自动渲染最新效果
          matrixAutoUpdate: true,
          scriptFrame: 60,
        },
        texture: {
          // load: false,
        },
      })
        .load({
          // path: "./assets/scene.glb",
          path:
            "https://3d-editor-2-1303915342.cos.ap-shanghai.myqcloud.com/202309111337244629621001202374.lt",
          dom: this.$refs["workShop"],
        })
        .on("complete", () => {
          this.$emit("load");

          // 代码运行
          runScene.code.createFunc()({ bus });

          fn(runScene, {
            Utils,
            bus,
            Three: THREE,
          });
        });
    },

    // 打印点击到的模型
    logClickModel(model) {
      console.log("点击的模型为:", model.name, model);
    },
    // 判断是否需要为伪加载
  },
  // 场景自带销毁
  destroyed() {
    // sceneChange && sceneChange.dispose();
  },
};

// 导出场景 资源
export { sceneChange, runScene as scene };
</script>

<style lang="scss" scoped>
// 场景
.workShop {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
}

.text {
  width: 250px;
}
.workShop .btn {
  position: absolute;
  z-index: 2;
}

.workShop .show {
  opacity: 1 !important;
}

.workShop .none {
  opacity: 0 !important;
}

.workShop .block {
  display: block !important;
}
.sprites {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: red;
  opacity: 0;
}
.showOpacity {
  opacity: 1 !important;
}

.machine-infoSprite {
  width: 400px !important;
  height: 200px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: pink;
  font-size: 50px;
  opacity: 0;
}
</style>

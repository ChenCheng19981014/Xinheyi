// const console = {
//   log: () => { }
// }

const fn = (runScene, inputData = {}, constant = {}) => {

  const fn = (map) => {

    const {
      runScene,
      Utils,
      core,
      getModel,
      constant,
      bus,
      Three,
      camera, scene, controls, renderer
    } = map;

    // 拿到常量

    // 场景初始化
    class InitScene {
      name = 'initScene';
      mounted() {
        // 脚本
        runScene.script.playAll();

        controls.screenSpacePanning = false;


        // 入场动画
        // runScene.cameraEx.setTemp('初始', { time: 2 });
      }
    }

    // 机器
    class Machine {
      name = "machine";
      // 机器 模型
      machineModel = {};
      mounted() {
      }



      dispose() { }
    }

    // 点位
    class Point {
      name = 'point'
      mounted() {
      }

      getModel() {
      }

      dispose() {

      }

    }

    // 基本事件
    class Events {
      name = 'events'
      constructor() {
        // runScene.assetsEx.controls.addEventListener("start", this.controlStart);
        // runScene.cb.model.setSelect.add(
        //   "trigger-click",
        //   this.triggerClick.bind(this)
        // );

        runScene.cb.model.click.add(
          "trigger-click",
          this.triggerClick.bind(this)
        );
      }

      triggerClick = (model) => {
        if (!model) return;
        bus.$emit("logClickModel", model);
        // console.log('model.name:', model.name);
        if (model.name === '点击') bus.$emit('change-scene', 'WorkShop')
      };

      dispose() {
        controls.removeEventListener("start", this.controlStart);
      }
    }

    return [Machine, Events, Point, InitScene,];
  };

  const modules = fn({
    runScene,
    getModel: runScene.modelEx.getModel.bind(runScene.modelEx),
    core: runScene.custom,
    ...runScene.assetsEx.get(),
    ...inputData,
    constant,
    window: null,
  });

  if (!modules) return;

  modules
    .map((TheClass) => {
      const ins = new TheClass();
      if (!ins.name) throw TypeError("代码出错");
      runScene.custom[ins.name] = ins;
      return ins;
    })
    .map((ins) => ins?.mounted?.());
};

export { fn };

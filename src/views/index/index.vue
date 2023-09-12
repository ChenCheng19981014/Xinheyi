<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: all;
}
</style>

<template>
  <div class="index">
    <!-- <ThreeScene></ThreeScene> -->
    <!-- <WorkShop></WorkShop> -->
    <KeepAlive v-if="true">
      <component :is="showScene"></component>
    </KeepAlive>
  </div>
</template>

<script>
import bus from "./../../lib/bus";
import ThreeScene from "./../../components/three-scene/scene/index.vue";
import WorkShop from "./../../components/workshop/scene/index.vue";
export default {
  data() {
    return {
      showScene: "ThreeScene",
    };
  },
  components: {
    ThreeScene,
    WorkShop,
  },
  mounted() {
    bus.$on("change-scene", (name) => {
      this.showScene = name;
    });
  },
  methods: {},
};
</script>

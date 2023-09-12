/**
 * @description vue状态管理
 */

import store from "vuex";
import Vue from "vue";

Vue.use(store);

export default new store.Store({
    state: {
        //路由切换状态
        rc: false,
        // 登录状态
        loginState: false,
        // 用户信息
        userInfo: {},
        domName: "null", // 名称(id)
    },
    mutations: {

        // 更新 称
        updateShopName(state, domName) {
            state.domName = domName;
        },

    },
    actions: {


    },
});

import * as mutationsTypes from './mutations-types'
import * as api from '@/api'

export default {
    //异步获取地址
    async getAddress ({commit, state}) {
        // 从state状态中获取到经纬度用来设置reqAddress的参数（看接口文档）
        const geohash = state.latitude + ',' + state.longitude;

        // 1. 发送异步ajax请求
        const result = await api.reqAddress(geohash);
        // 2. 根据结果提交一个mutation
        if (result.code === 0) {
            const address = result.data;
            commit(mutationsTypes.RECEIVE_ADDRESS, {address})
        }
    },
    //异步获取分类列表
    async getCategorys ({commit}) {
        const result = await api.reqCategorys();
        if (result.code === 0) {
            const categorys = result.data;
            commit(mutationsTypes.RECEIVE_CATEGORYS, {categorys})
        }
    },
    //异步获取商家列表
    async getShops ({commit, state}) {
        //对象的解构赋值
        const {latitude, longitude} = state;
        //注意参数的顺序
        const result = await api.reqShops({latitude, longitude});
        if (result.code === 0) {
            const shops = result.data;
            commit(mutationsTypes.RECEIVE_SHOPS, {shops})
        }
    },
    // 同步记录用户信息
    recordUser ({commit}, userInfo) {
        commit(mutationsTypes.RECEIVE_USER_INFO, {userInfo})
    },
    // 异步获取用户信息(先引入reqUserInfo接口)
    async getUserInfo ({commit}) {
        const result = await api.reqUserInfo();
        if (result.code === 0) {
            const userInfo = result.data;
            commit(mutationsTypes.RECEIVE_USER_INFO, {userInfo})
        }
    },
    //异步退出
    async logout ({commit}) {
        const result = await api.reqLogout();
        if (result.code === 0) {
            commit(mutationsTypes.RESET_USER_INFO)
        }
    },
    //异步获取商家信息
    async getShopInfo ({commit}) {
        const result = await api.reqShopInfo();
        // console.log(result);
        if (result.code === 0) {
            const info = result.data;
            commit(mutationsTypes.RECEIVE_INFO, {info})
        }
    },
    // 异步获取商家评论列表
    async getShopRatings ({commit}, callback) {
        const result = await api.reqShopRatings();
        // console.log(result);
        if (result.code === 0) {
            const ratings = result.data;
            commit(mutationsTypes.RECEIVE_RATINGS, {ratings});
            //数据更新了，通知一下组件
            callback && callback()
        }
    },
    // 异步获取商家商品列表
    async getShopGoods ({commit}, callback) {
        const result = await api.reqShopGoods();
        // console.log(result);
        if (result.code === 0) {
            const goods = result.data;
            commit(mutationsTypes.RECEIVE_GOODS, {goods});
            //数据更新了，通知一下组件
            callback && callback()
        }

    },
    // 同步更新food中的count值
    updateFoodCount ({commit}, {isAdd, food}) {
        if (isAdd) {
            commit(mutationsTypes.INCREMENT_FOOD_COUNT, {food})
        } else {
            commit(mutationsTypes.DECREMENT_FOOD_COUNT, {food})
        }
    },
    // 同步清空购物车
    clearCart ({commit}) {
        commit(mutationsTypes.CLEAR_CART)
    },
    // 异步获取商家商品列表的action
    async searchShops ({commit, state}, { keyword, callback }) {
        const geohash = state.latitude + ',' + state.longitude;
        const result = await api.reqSearchShop(geohash, keyword);
        if (result.code === 0) {
            const searchShops = result.data;
            commit(mutationsTypes.RECEIVE_SEARCH_SHOPS, {searchShops});
            //数据更新了，通知一下组件
            // console.log('callback :', callback);
            callback && callback()
        }
    }
}

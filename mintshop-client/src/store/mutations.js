import * as mutationsTypes from './mutations-types'
import Vue from 'vue';

// [方法名](state,{param}){}
export default {
    [mutationsTypes.RECEIVE_ADDRESS](state, {address}) {
        state.address = address
    },
    [mutationsTypes.RECEIVE_CATEGORYS](state, {categorys}) {
        state.categorys = categorys
    },
    [mutationsTypes.RECEIVE_SHOPS](state, {shops}) {
        state.shops = shops
    },
    [mutationsTypes.RECEIVE_USER_INFO](state, {userInfo}) {
        state.userInfo = userInfo
    },
    [mutationsTypes.RESET_USER_INFO](state) {
        state.userInfo = {}
    },
    [mutationsTypes.RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [mutationsTypes.RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
    [mutationsTypes.RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    [mutationsTypes.INCREMENT_FOOD_COUNT](state, {food}) {
        if (!food.count) { //第一次增加
            /** Vue.set( target, propertyName/index, value ) */
            Vue.set(food, 'count', 1); // 让新增的属性也有数据绑定
            // console.log('food :', food);
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [mutationsTypes.DECREMENT_FOOD_COUNT](state, {food}) {
        if (food.count) { // 只有有值才去减
            food.count--;
            if (food.count === 0) {
                // 将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [mutationsTypes.CLEAR_CART](state) {
        //清除food中的count
        state.cartFoods.forEach(food => {
            food.count = 0
        });
        // 移除购物车中所有购物项
        state.cartFoods = []
    },
    [mutationsTypes.RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
        state.searchShops = searchShops
    }
}

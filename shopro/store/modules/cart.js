// 购物车模块
import http from '@/shopro/request/index'
import store from '@/shopro/store/index.js'
import {
	CART_LIST,
	CART_NUM
} from '../types.js'
const state = {
	cartList: uni.getStorageSync('cartList') ? uni.getStorageSync('cartList') : [],
	checkCart: {}, //检测是否是购物车数据的对象
	allSelected: false,
	cartNum: uni.getStorageSync('cartNum') ? uni.getStorageSync('cartNum') : 0, //购物车,涉及到刷新数据丢失，所以存了本地,
}

const actions = {
	// 购物车数据（查）
	getCartList({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			http('cart.index').then(res => {
				if (res.code === 1) {
					let cartData = res.data;
					cartData.length && cartData.map(item => {
						item.checked = true;
					})
					uni.setStorageSync('cartNum', cartData.length);
					commit('CART_LIST', cartData);
					commit('checkCartList');
					commit('getCheckCart')
					commit('CART_NUM');
				}

			}).catch(e => {
				reject(e)
			})
		})
	},
	// 添加到购物车（增）
	addCartGoods({
		commit,
		dispatch,
	}, data) {
		return new Promise((resolve, reject) => {
			http('cart.add', {
				goods_list: data.list,
				from: data.from
			}).then(res => {
				if (res.code === 1) {
					dispatch('getCartList');
				}
				resolve(res)
			}).catch(e => {
				reject(e)
			})
		})
	},
	// 修改购物车商品数量（改）|| 删除购物车商品（删）
	changeCartList({
		commit,
		state,
		dispatch
	}, param) {
		return new Promise((resolve, reject) => {
			http('cart.edit', {
				cart_list: param.ids,
				value: param.goodsNum || null,
				act: param.art
			}).then(res => {
				if (param.art === 'delete' && res.code === 1) {
					dispatch('getCartList');
				}
				resolve(res)
				commit('checkCartList');
			}).catch(e => {
				reject(e)
			})
		})
	},
}

const mutations = {
	// cart数据获取变动。
	[CART_LIST](state, data) {
		uni.setStorageSync('cartList', data)
		state.cartList = data
	},
	// cart数量角标更新。
	[CART_NUM](state, data) {
		let cartNum = uni.getStorageSync('cartNum') ? uni.getStorageSync('cartNum') : 0;
		if (Number(cartNum)) {
			uni.setTabBarBadge({
				index: 2,
				text: String(cartNum)
			})
		} else {
			uni.removeTabBarBadge({
				index: 2
			})
		}
		state.cartNum = cartNum
	},
	// 切换全选。
	changeAllSellect(state) {
		state.allSelected = !state.allSelected;
	},
	// 全选设置
	getAllSellectCartList(state, flag) {
		state.cartList.map(item => {
			item.checked = flag
		})
	},
	// 全选检测
	checkCartList(state) {
		let all = true;
		state.cartList.map(item => {
			if (!item.checked) {
				all = false
			}
		})
		state.allSelected = all;
	},
	// 是否购物车数据检测
	getCheckCart(state) {
		let obj = {};
		state.cartList.map(item => {
			obj[item.goods_id] = {
				num: item.goods_num,
				cartOrderId: item.id
			};
		});
		state.checkCart = obj;
	},
}

const getters = {
	// 购物车数量和总价
	totalCount: state => {
		let totalNum = 0;
		let totalPrice = 0;
		state.cartList.filter(item => {
			if (item.checked) {
				totalNum += 1;
				totalPrice += item.goods_num * (item.sku_price ? item.sku_price.price : 0);
			}
		})
		return {
			totalNum,
			totalPrice
		}
	},

	// 是否选择了商品
	isSel: state => {
		let isSel = false;
		state.cartList.map(item => {
			if (item.checked) {
				isSel = true
			}
		})
		return isSel
	},

	// 活动商品唯一选中可以结算
	isActivityPay() {
		let num = 0
		let activityNum = 0
		state.cartList.map(item => {
			if (item.checked) {
				num += 1
				if (item.cart_type === 'activity') {
					activityNum += 1
				}
			}
		})
		if ((num === 1 && activityNum === 1) || activityNum === 0) {
			return true
		}
		return false
	}

}

export default {
	state,
	mutations,
	actions,
	getters
}

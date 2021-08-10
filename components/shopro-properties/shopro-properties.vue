<template>
	<!-- 规格 -->
	<u-popup v-model="showModal" :closeable="true" mode="bottom" close-icon-pos="top-right" border-radius="30" >
		<view class="shop-modal page_box">

			<!-- 规格选项 -->
			<scroll-view scroll-y class="content_box">
				<view class="select-box u-felx-col u-row-left" >
					<view class="type-title">物品类型</view>
					<view class="tag-box u-flex u-flex-wrap">
						<button
							class="tag u-reset-button"
							v-for="(sc, y) in properties"
							:key="sc.id"
							:class="{ 'tag-active': currentSkuArray[sc.pid] == sc.id, 'tag-disabled': sc.disabled == true }"
							:disabled="sc.disabled == true"
							@tap="chooseSku(sc.pid, sc.id,sc.name)"
						>
							{{ sc.name }}
						</button>
					</view>
				</view>
				<view class="select-box u-felx-col u-row-left" >
					<view class="type-title">特殊配送需求</view>
					<view class="tag-box u-flex u-flex-wrap">
						<button
							class="tag u-reset-button"
							v-for="(sc, y) in special"
							:key="sc.id"
							:class="{ 'tag-active': currentSkuArray2[sc.pid] == sc.id, 'tag-disabled': sc.disabled == true }"
							:disabled="sc.disabled == true"
							@tap="chooseSku2(sc.pid, sc.id,sc.name)"
						>
							{{ sc.name }}
						</button>
					</view>
				</view>
			</scroll-view>

			<!-- 功能按钮 -->
			<view class="btn-box foot_box u-flex u-row-between">
				<button class="u-reset-button cu-btn save-btn"  @tap="confirm">确认</button>
			</view>
		</view>
	</u-popup>
</template>

<script>
/**
 * 多规格组件
 * @property {Object} goodsInfo - 商品数据
 * @property {Boolean} value = showModal - 显隐
 * @property {String} buyType  - 购买方式
 * @property {String} goodsType - 商品类别
 * @property {String} grouponBuyType -拼团商品购买方式
 * @property {Number} grouponId - 拼团ID,分享进入
 * @property {Object} activityRules - 活动状态。
 */
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {},
	data() {
		return {
			skuList: [],
			currentSkuPrice: {},
			currentSkuArray: [],
			currentSkuArray2: [],
			goodsNum: 1,
			confirmGoodsInfo: {},
			type: this.buyType,
			pro_name:'',
			pro_id:'',
			special_name:'',
			special_id:'',
		};
	},
	props: {
		goodsInfo: {},
		properties:{},
		special:{},
		activityRules: {},
		value: {},
		buyType: {
			type: String,
			default: 'sku'
		},
		goodsType: {
			type: String,
			default: 'goods'
		},
	},
	created() {
		this.changeDisabled(false);
	},
	mounted() {
	},
	watch: {
		type(nweVal, oldVal) {
			return newVal;
		}
	},
	computed: {
		skuPrice() {
			return this.goodsInfo.sku_price;
		},
		showModal: {
			get() {
				return this.value;
			},
			set(val) {
				val ? uni.hideTabBar() : uni.showTabBar();
				this.$emit('input', val);
			}
		}
	},

	methods: {
		...mapActions(['addCartGoods', 'getCartList']),
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},

		// 选择物品规格
		chooseSku(pid, skuId,name) {
			let that = this;
			let isChecked = true; // 选中 or 取消选中
			this.pro_name=name
			this.pro_id=pid
			console.log("currentSkuArray"+JSON.stringify(that.currentSkuArray))
			if (that.currentSkuArray[pid] != undefined && that.currentSkuArray[pid] == skuId) {
				// 点击已被选中的，删除并填充 ''
				isChecked = false;
				that.currentSkuArray.splice(pid, 1, '');
			} else {
				if(that.currentSkuArray.length>0){
					that.currentSkuArray=[]
				}
				// 选中
				that.$set(that.currentSkuArray, pid, skuId);
				console.log("currentSkuArray2"+JSON.stringify(that.currentSkuArray))
			}
		},
	// 选择服务规格
		chooseSku2(pid, skuId,name) {
			let that = this;
			let isChecked = true; // 选中 or 取消选中
			this.special_name=name
			this.special_id=pid
			console.log("currentSkuArray2"+JSON.stringify(that.currentSkuArray2))
			if (that.currentSkuArray2[pid] != undefined && that.currentSkuArray2[pid] == skuId) {
				// 点击已被选中的，删除并填充 ''
				isChecked = false;
				that.currentSkuArray2.splice(pid, 1, '');
			} else {
				if(that.currentSkuArray2.length>0){
					that.currentSkuArray2=[]
				}
				// 选中
				that.$set(that.currentSkuArray2, pid, skuId);
				console.log("currentSkuArray2"+JSON.stringify(that.currentSkuArray2))
			}
		},
		// 确定
		confirm() {
			this.confirmSku();
			switch (this.buyType) {
				case 'cart':
					this.confirmCart();
					break;
				case 'buy':
					this.confirmBuy();
					break;
				default:
			}
		},
		// 确定规格
		confirmSku() {
			let that = this;
			that.showModal = false;
			uni.$emit('SELECT_PROPERTIES', { pro_id: this.pro_id,pro_name:this.pro_name });
			uni.$emit('SELECT_SPECIAL', { special_id: this.special_id,special_name:this.special_name });
			return true;
		}
	}
};
</script>

<style lang="scss" scoped>
.size-box {
	line-height: 82rpx;
	background: #fff;
	padding: 0 20rpx;
	margin: 20rpx 0;
	font-size: 28rpx;

	.title {
		color: #999;
		margin-right: 20rpx;
	}

	.cuIcon-right {
		color: #bfbfbf;
		font-size: 36rpx;
	}
}

// 规格
.shop-modal {
	width: 750rpx;
	height: 950rpx;
	background: rgba(255, 255, 255, 1);
	padding: 20rpx 20rpx 30rpx;
	// 商品卡片
	.top {
		margin: 30rpx 0;
		border-radius: 20rpx;
		padding: 20rpx;

		.shop-img {
			width: 160upx;
			height: 160upx;
			border-radius: 6upx;
			margin-right: 30upx;
			background: #ccc;
		}

		.goods-box {
			height: 160upx;
			width: 490rpx;
			align-items: flex-start;

			.goods-title {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 42rpx;
				text-align: left;
			}

			.goods-bottom {
				width: 100%;
			}

			.price-box {
				font-size: 36upx;

				font-weight: bold;
				color: #e1212b;

				.unit {
					font-size: 24upx;

					font-weight: bold;
					color: #e1212b;
				}
			}

			.stock {
				font-size: 26rpx;
				color: #999;
			}
		}
	}

	// 规格选项
	.select-box {
		margin-bottom: 30rpx;
		.type-title {
			// font-size: 26upx;
			font-size: 21px;
			font-weight: 400;
			margin-bottom: 20upx;
			// margin-bottom: 13px;
		}
		.tag-box {
			flex-wrap: wrap;
		}
		.tag {
			line-height: 62rpx;
			background: #f4f4f4;
			border-radius: 31rpx;
			// font-size: 28upx;
			font-size: 21px;
			font-weight: 400;
			color: #666666;
			padding: 0 30upx;
			// margin-bottom: 20rpx;
			margin-bottom: 20px;
			// margin-right: 10rpx;
			margin-right: 20px;
		}

		.tag-active {
			background: linear-gradient(90deg, #e9b461, #eecc89);
			// font-size: 28rpx;
			font-size: 21px;
			font-weight: 400;
			color: #ffffff;
		}

		.tag-disabled {
			background: #f8f8f8;
			color: #cacaca;
		}
	}

	.buy-num-box {
		.num-title {
			font-size: 26upx;

			font-weight: 400;
			margin-bottom: 20upx;
		}
	}
}

.btn-box {
	height: 100rpx;

	.cu-btn {
		width: 340rpx;
		line-height: 70rpx;
		border-radius: 35rpx;
		font-size: 28rpx;

		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		padding: 0;
	}

	.cart-btn {
		background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
		box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
	}

	.buy-btn {
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
	}
	.save-btn {
		width: 710rpx;
		height: 70rpx;
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		border-radius: 35rpx;
		padding: 0;
	}
	.cancel-btn {
		width: 710rpx;
		height: 70rpx;
		background: rgba(221, 221, 221, 1);
		font-size: 28rpx;
		font-weight: 500;
		color: #999999;
		border-radius: 35rpx;
		padding: 0;
	}
}
</style>

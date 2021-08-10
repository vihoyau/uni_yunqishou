<!-- 确认订单 -->
<template>
	
	
	<view class="order-wrap" >
		<!-- 地址栏 -->
		<u-navbar backIconName=""  :background="navbar.background" :backTextStyle="navbar.backTextStyle"" backText="申请跑腿订单">
		(下拉页面刷新清空)
		</u-navbar>
		<view class="head_box" v-if="orderPre.need_address" @tap="jump('/pages/user/address1/list', { from: 'order' })" style="background-color: #2979FF;">
			<view class="add-address-box u-flex u-flex-1" v-if="!addressId1">
				<view class="box-bg u-p-30 u-flex-1 u-flex u-row-between">
					<text class="select-notice">请选择取货地址</text>
					<u-icon name="arrow-right" size="28" color="#bfbfbf"></u-icon>
				</view>
			</view>
			<view class="add-address-box u-p-30" v-else>
				<view class="top u-flex">
					<text class="name"><u-icon name="map" size="28" color="#a76f0d"></u-icon>取件</text>
					<text class="phone">{{ addressData1.phone }}</text>
					<text class="tag" v-show="addressData1.is_default == 1">默认</text>
				</view>
				<view class="detail u-flex u-row-between">
					<view class="address">{{ addressData1.consignee }},{{ addressData1.province_name }}{{ addressData1.city_name }}{{ addressData1.area_name }}{{ addressData1.address }}</view>
					<u-icon name="arrow-right" size="28" color="#bfbfbf"></u-icon>
				</view>
			</view>
		</view>
		<view class="head_box" v-if="orderPre.need_address" @tap="jump('/pages/user/address2/list', { from: 'order' })"  style="background-color: #2979FF;">
			<view class="add-address-box u-flex u-flex-1" v-if="!addressId2">
				<view class="box-bg u-p-30 u-flex-1 u-flex u-row-between">
					<text class="select-notice">请选择收货地址</text>
					<u-icon name="arrow-right" size="28" color="#bfbfbf"></u-icon>
				</view>
			</view>
			<view class="add-address-box u-p-30" v-else>
				<view class="top u-flex">
					<text class="name"><u-icon name="map" size="28" color="#a76f0d"></u-icon>收货</text>
					<text class="phone">{{ addressData2.phone }}</text>
					<text class="tag" v-show="addressData2.is_default == 1">默认</text>
				</view>
				<view class="detail u-flex u-row-between">
					<view class="address">{{ addressData2.consignee }},{{ addressData2.province_name }}{{ addressData2.city_name }}{{ addressData2.area_name }}{{ addressData2.address }}</view>
					<u-icon name="arrow-right" size="28" color="#bfbfbf"></u-icon>
				</view>
			</view>
		</view>
		<view class="u-m-b-10">
			<!-- 确认订单商品卡片 -->
			<view class="goods-list" >
				<!-- 配送方式 -->
				<view class="logistic item-list u-flex u-row-between" @tap="changeTime()">
					<view class="item-title">骑手取单时间</view>
					<view class="u-flex">
						<!-- <view class="detail">{{ getCurGoodsExpress(g) }}</view> -->
						{{ checkTime['day'][checkDayCur].title }}{{ checkTime['time'][checkTimeCur] }}
						<u-icon name="arrow-right" size="28" color="#bfbfbf"></u-icon>
					</view>
				</view>
				<view class="logistic item-list u-flex u-row-between" @tap="change_sku()">
					<view class="item-title">选择物品信息</view>
					<view class="u-flex">
						<view class="detail">
						<view v-if="pro_name">{{pro_name}}</view>
						<view v-if="special_name">,{{special_name}}</view>
						</view>
						<u-icon name="arrow-right" size="28" color="#bfbfbf"></u-icon>
					</view>
				</view>
			</view>
			<view class="goods-list" >
				<!-- 配送方式 -->
				
			</view>
			<block >
				<!-- 备注 -->
				<view class="remark-box u-flex item-list">
					<view class="item-title">备注</view>
					<input class="item-input u-p-30" placeholder-class="input-pl" type="text" v-model="remark" placeholder="备注的内容" />
				</view>

				<!-- 选择优惠券 -->
				<sh-select-coupon :couponList="couponList" @change="selectCoupon"></sh-select-coupon>

				<!-- 积分 -->
				<view class="score item-list u-flex u-row-between" v-show="orderType === 'score'">
					<view class="u-flex"><text class="item-title">积分</text></view>
					<view class="price">-{{ orderPre.score_amount || 0 }}积分</view>
				</view>
				<!-- 金额明细 -->
				<view class=" u-flex u-row-between item-list border-top u-m-b-10">
					<view class="item-title">代收金额</view>
					<input class="item-input u-p-30" placeholder-class="input-pl" type="digit"  @input="onSearch" v-model="goods_money" placeholder="需要向客人收取才填写" />元
				</view>

				<view class=" u-flex u-row-between item-list border-top u-m-b-10">
					<view class="item-title" style="color: red;">加急小费</view>
					<input class="item-input u-p-30" placeholder-class="input-pl" type="digit" @input="onSearch" v-model="fee" placeholder="金额越大越快速接单" />元
				</view>
				<!-- 活动优惠 -->
				<u-collapse
					v-if="orderPre.activity_discount_infos && orderPre.activity_discount_infos.length && Number(orderPre.activity_discount_money)"
					event-type="close"
					:arrow="true"
					:accordion="true"
					arrowColor="#bfbfbf"
					:head-style="{ background: '#fff', height: '100rpx' }"
				>
					<u-collapse-item>
						<block slot="title">
							<view style="width: 680rpx;padding-right: 0;" class="u-flex u-row-between item-list">
								<view class="item-title">活动优惠</view>
								<view class="u-flex">
									<text class="price" style="margin-right: 0;">-￥{{ orderPre.activity_discount_money || '0.00' }}</text>
								</view>
							</view>
						</block>
						<view class="" v-for="item in orderPre.activity_discount_infos" :key="item.activity_id">
							<view class="u-flex u-row-between item-list" v-if="item.activity_type !== 'free_shipping'">
								<view class="item-title">{{ item.activity_title }}</view>
								<view class="u-flex">
									<text class="price" style="color: #666;">-￥{{ item.activity_discount_money || '0.00' }}</text>
								</view>
							</view>
						</view>
					</u-collapse-item>
				</u-collapse>
				<view class="price-box  u-flex u-row-between item-list">
					<view class="item-title u-flex u-col-center">
						<view class="u-m-r-10">运费<view v-if></view></view>
					</view>
					<view class="u-flex">
						<text class="price">￥{{ Number(orderPre.distance_fee) || '0.00' }}</text>
					</view>
				</view>
				<view class="price-box  u-flex u-row-between item-list">
					<view class="item-title u-flex u-col-center">
						<view class="u-m-r-10">代收金额手续费</view>
					</view>
					<view class="u-flex">
						<text class="price">￥{{ Number(orderPre.receivefee) || '0.00' }}</text>
					</view>
				</view>
				<view class="price-box  u-flex u-row-between item-list">
					<view class="item-title u-flex u-col-center">
						<view class="u-m-r-10">物品附加费</view>
					</view>
					<view class="u-flex">
						<text class="price">￥{{ Number(orderPre.profee) || '0.00' }}</text>
					</view>
				</view>
				<view class="price-box  u-flex u-row-between item-list">
					<view class="item-title u-flex u-col-center">
						<view class="u-m-r-10">特殊需求费</view>
					</view>
					<view class="u-flex">
						<text class="price">￥{{ Number(orderPre.special_fee) || '0.00' }}</text>
					</view>
				</view>
<!-- 				<view class="zanzhu"><image style="width: 400px;height: 60px;" src="https://panda.xmllcake.com/pandacake-formal/1628234263617.jpg"></image></view>
 -->				
				<view class="price-box  u-flex u-row-between item-list2">
					<view class="u-flex">
						
						<view class="all-money">
							<text>合计：</text>
							<text class="price">￥{{ orderPre.total_fee || '0.00' }}</text>
						</view>
					</view>
					<u-button shape="circle" :disabled="isDisabled" :loading="isDisabled" :custom-style="customStyle" :hair-line="false" hover-class="btn-hover" @click="subOrder">
						提交订单
					</u-button>
				</view>
			</block>
		</view>

		<!-- 底部 -->
		<view class="foot-box-wrap">
			<view class="foot-box u-flex u-row-between safe-area-inset-bottom">
				<view class="u-flex">
					<text class="num">共{{ totalNum }}件</text>
					<view class="all-money">
						<text>合计：</text>
						<text class="price">￥{{ orderPre.total_fee || '0.00' }}</text>
					</view>
				</view>
				<u-button shape="circle" :disabled="isDisabled" :loading="isDisabled" :custom-style="customStyle" :hair-line="false" hover-class="btn-hover" @click="subOrder">
					提交订单
				</u-button>
			</view>
		</view>

		<!-- 登录提示 -->
		<shopro-auth-modal></shopro-auth-modal>

	<!-- 规格弹窗 -->
	<shopro-properties
		v-if="showSku"
		v-model="showSku"
		:properties="properties"
		:special="special"
		@changeType="changeType"
		@getSkuText="getSkuText"
	></shopro-properties>
		<!-- 配送时间弹窗 -->
		<u-popup v-model="showCheckTime" mode="bottom" safe-area-inset-bottom :closeable="true" close-icon-pos="top-right" border-radius="20">
			<view class="checkTime-box page_box">
				<view class="checkTime-head">选择取单时间</view>
				<view class="checkTime-content content_box u-flex">
					<view class="checkTime-content__left">
						<view
							class="left-item u-flex u-row-center u-col-center"
							@tap="check('day', index)"
							:class="{ 'item--active': checkDayCur == index }"
							v-for="(day, index) in checkTime.day"
							:key="day.value"
						>
							{{ day.title }}
						</view>
					</view>
					<scroll-view class="checkTime-content__right scroll-box" :scroll-into-view="'c' + checkTimeId" scroll-y scroll-with-animation>
						<view
							class="right-item"
							:id="'c' + time.split(':')[0]"
							@tap="check('time', index)"
							:class="{ 'item--active': checkTimeCur == index }"
							v-for="(time, index) in checkTime.time"
							:key="time"
						>
							{{ time }}
						</view>
					</scroll-view>
				</view>
				<view class=" checkTime-foot u-flex u-row-center u-col-center"><button class="u-reset-button save-btn" @tap="showCheckTime = false">保存并使用</button></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import shSelectCoupon from './components/sh-select-coupon.vue';
import { mapMutations, mapActions, mapState } from 'vuex';
import Auth from '@/shopro/permission/index.js';
export default {
	components: {
		shSelectCoupon
	},
	data() {
		return {
			platform: this.$platform.get(),
			totalNum: 0,
			couponList: [], //优惠券列表
			addressData1: {}, //取货地址
			addressData2: {}, //收货地址
			addressId1: 0, //取货地址ID
			addressId2: 0, //收货地址ID
			navbar: {
				background: {
					background: '#2979FF',
					backIconColor:'#2979FF'
				},
				backTextStyle: {
					color: 'white',
					fontSize: '36rpx'
				}
			},
			customStyle: {
				//自定义按钮样式
				width: '210rpx',
				lineHeight: '70rpx',
				background: 'linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1))',
				boxShadow: ' 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22)',
				borderRadius: '100rpx',
				fontSize: '28rpx',
				border: 'none',
				color: '#fff',
				margin: '0'
			},
			isDisabled: false, //提交
			showCheckTime: false, //配送时间弹窗。
			checkTime: {}, //配送时间数据
			showExpressType: false, //配送方式弹窗
			showSku: false, //是否显示规格弹窗
			from: '',
			orderType: '',
			grouponBuyType: 'alone',
			grouponId: 0,
			goodsList: [], //传递过来的参数
			currentGoodsId: 0, //当前商品id.
			currentSkuId: 0, //商品的规格ID
			orderPre: {},
			couponId: 0,
			couponPrice: '选择优惠券',
			expressTypeCur: '',
			inExpressType: [], //当前商品支持的配送方式。
			isProtocol: true, //自提协议。
			selfPhone: '', //编辑手机号
			getFocus: false, //获取焦点。
			checkType: '自提',
			checkTimeCur: 0, //默认选中时间。
			checkTimeId: 'c1', //锚点用
			checkDayCur: 0, //默认日期
			lat: 0, //地理位置
			lng: 0,
			remark: '',
			fee:'',
			pro_id:'',
			pro_name:'',
			special_name:'',
			special_id:'',
			goods_money:'',
			special_fee:''
		};
	},
	computed: {
		...mapState({
			storeTcp: ({ shopro }) => shopro?.config?.store
		}),
		expressClass() {
			let cl = 'head-nav--active';
			const { expressType, expressTypeCur } = this;
			if (expressTypeCur === 0) {
				cl = 'head-nav__left--active';
			}
			if (expressTypeCur === expressType.length - 1) {
				cl = 'head-nav__right--active';
			}
			return cl;
		},
		// 是否可以使用优惠券
		hasCoupons() {
			if (this.couponList.length && !this.orderPre.activity_type) {
				return true;
			}
			return Boolean(
				this.couponList.length &&
					this.orderPre.activity_type &&
					this.orderPre.activity_type.indexOf('groupon') === -1 &&
					this.orderPre.activity_type.indexOf('seckill') === -1 &&
					this.orderType !== 'score'
			);
		}
	},
	onShow() {
		// 监听选择自提点
		uni.$once('SELECT_STORE', res => {
			this.storeInfo = JSON.parse(res.storeInfo);
		});
		// 监听属性
		uni.$on('SELECT_PROPERTIES', res => {
			console.log("监听属性"+res.pro_name)
			if (res.pro_id) {
				this.pro_id = res.pro_id;
				this.pro_name = res.pro_name;
			} 
			res.addressData && uni.$off('SELECT_PROPERTIES');
			this.getPre();
			
		});
		// 监听特殊服务
		uni.$on('SELECT_SPECIAL', res => {
			console.log("监听特殊服务"+res.special_name)
			if (res.special_id) {
				this.special_id = res.special_id;
				this.special_name = res.special_name;
			} 
			res.addressData && uni.$off('SELECT_SPECIAL');
		});
		// 监听地址
		uni.$on('SELECT_ADDRESS1', res => {
			if (res.addressData) {
				this.addressData1 = JSON.parse(res.addressData);
				this.addressId1 = this.addressData1.id;
			} else {
				this.addressId1 = 0;
			}
			this.getPre();
			res.addressData && uni.$off('SELECT_ADDRESS1');
		});
		// 监听地址
		uni.$on('SELECT_ADDRESS2', res => {
			if (res.addressData) {
				this.addressData2 = JSON.parse(res.addressData);
				this.addressId2 = this.addressData2.id;
			} else {
				this.addressId2 = 0;
			}
			this.getPre();
			res.addressData && uni.$off('SELECT_ADDRESS2');
		});
	},
	// 下拉刷新
	
	async onLoad() {
		this.goodsList = this.$Route.query.goodsList;
		this.from = this.$Route.query.from;
		this.orderType = this.$Route.query.orderType;
		this.grouponBuyType = this.$Route.query.grouponBuyType;
		this.grouponId = this.$Route.query.grouponId;
		await this.init();
		this.getProperties()
	},
	methods: {
		...mapActions(['getCartList', 'getMessageIds']),
		onPullDownRefresh() {
			this.init();
		},
		init() {

			return Promise.all([this.getRefresh(),this.getDefaultAddress1(),this.getDefaultAddress2(), this.initDate(), this.getCoupons(),this.getPre()]).then(() => {
				uni.stopPullDownRefresh();
			});
		},
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},

		// 格式化选择时间
		initDate() {
			let week = {
				0: '周日',
				1: '周一',
				2: '周二',
				3: '周三',
				4: '周四',
				5: '周五',
				6: '周六'
			};
			let now = new Date().getTime();
			let today = this.$u.timeFormat(now);
			let tomorrow = this.$u.timeFormat(now + 86400000);
			let aftertomorrow = this.$u.timeFormat(now + 172800000);
			let week1 = week[new Date().getDay()];
			let week2 = week[new Date(now + 86400000).getDay()];
			let week3 = week[new Date(now + 172800000).getDay()];
			let obj = {
				day: [
					{
						title: '今天（' + week1 + '）',
						value: today
					},
					{
						title: '明天（' + week2 + '）',
						value: tomorrow
					},
					{
						title: '后天（' + week3 + '）',
						value: aftertomorrow
					}
				],
				time:['00:00', '00:10', '00:20', '00:30', '00:40', '00:50',
						   '01:00', '01:10', '01:20', '01:30', '01:40', '01:50',
						   '02:00', '02:10', '02:20', '02:30', '02:40', '02:50',
						   '03:00', '03:10', '03:20', '03:30', '03:40', '03:50',
						   '04:00', '04:10', '04:20', '04:30', '04:40', '04:50',
						   '05:00', '05:10', '05:20', '05:30', '05:40', '05:50',
						   '06:00', '06:10', '06:20', '06:30', '06:40', '06:50',
						   '07:00', '07:10', '07:20', '07:30', '07:40', '07:50',
						   '08:00', '08:10', '08:20', '08:30', '08:40', '08:50',
						   '09:00', '09:10', '09:20', '09:30', '09:40', '09:50',
						   '10:00', '10:10', '10:20', '10:30', '10:40', '10:50',
						   '11:00', '11:10', '11:20', '11:30', '11:40', '11:50',
						   '12:00', '12:10', '12:20', '12:30', '12:40', '12:50',
						   '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
						   '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
						   '15:00', '15:10', '15:20', '15:30', '15:40', '15:50',
						   '16:00', '16:10', '16:20', '16:30', '16:40', '16:50',
						   '17:00', '17:10', '17:20', '17:30', '17:40', '17:50',
						   '18:00', '18:10', '18:20', '18:30', '18:40', '18:50',
						   '19:00', '19:10', '19:20', '19:30', '19:40', '19:50',
						   '20:00', '20:10', '20:20', '20:30', '20:40', '20:50',
						   '21:00', '21:10', '21:20', '21:30', '21:40', '21:50',
						   '22:00', '22:10', '22:20', '22:30', '22:40', '22:50',
						   '23:00', '23:10', '23:20', '23:30', '23:40', '23:50',
						   ]
				// time: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
			};
			let time_demo=['00:00', '00:10', '00:20', '00:30', '00:40', '00:50',
						   '01:00', '01:10', '01:20', '01:30', '01:40', '01:50',
						   '02:00', '02:10', '02:20', '02:30', '02:40', '02:50',
						   '03:00', '03:10', '03:20', '03:30', '03:40', '03:50',
						   '04:00', '04:10', '04:20', '04:30', '04:40', '04:50',
						   '05:00', '05:10', '05:20', '05:30', '05:40', '05:50',
						   '06:00', '06:10', '06:20', '06:30', '06:40', '06:50',
						   '07:00', '07:10', '07:20', '07:30', '07:40', '07:50',
						   '08:00', '08:10', '08:20', '08:30', '08:40', '08:50',
						   '09:00', '09:10', '09:20', '09:30', '09:40', '09:50',
						   '10:00', '10:10', '10:20', '10:30', '10:40', '10:50',
						   '11:00', '11:10', '11:20', '11:30', '11:40', '11:50',
						   '12:00', '12:10', '12:20', '12:30', '12:40', '12:50',
						   '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
						   '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
						   '15:00', '15:10', '15:20', '15:30', '15:40', '15:50',
						   '16:00', '16:10', '16:20', '16:30', '16:40', '16:50',
						   '17:00', '17:10', '17:20', '17:30', '17:40', '17:50',
						   '18:00', '18:10', '18:20', '18:30', '18:40', '18:50',
						   '19:00', '19:10', '19:20', '19:30', '19:40', '19:50',
						   '20:00', '20:10', '20:20', '20:30', '20:40', '20:50',
						   '21:00', '21:10', '21:20', '21:30', '21:40', '21:50',
						   '22:00', '22:10', '22:20', '22:30', '22:40', '22:50',
						   '23:00', '23:10', '23:20', '23:30', '23:40', '23:50',
						   ]
			this.checkTime = obj;
		},
		getRefresh(){
			this.remark=''
			this.fee='',
			this.pro_id='',
			this.pro_name='',
			this.special_name='',
			this.special_id='',
			this.goods_money='',
			this.special_fee=''
		},
		// 格式日期
		check(type, index) {
			if (type == 'time') {
				this.checkTimeCur = index;
				this.checkTimeId = this.checkTime['time'][index].split(':')[[0]];
			}
			if (type == 'day') {
				this.checkDayCur = index;
			}
		},
		// 输入请求
		onSearch() {
			this.getPre()
		},
		// 获取当前商品配送方式
		getCurGoodsExpress(goods) {
			for (let item of this.goodsList) {
				if (item.goods_id == goods.goods_id && goods.sku_price_id == item.sku_price_id) {
					return this.expressTypeMap[item.dispatch_type];
				}
			}
		},
		// 组件返回的type;
		changeType(e) {
			this.buyType = e;
		},
		// 组件返回的规格;
		getSkuText(e) {
			this.currentSkuText = e;
		},
		// 获取位置
		async getLocation() {
			let authState = await new Auth('userLocation').check();
			// #ifdef MP ||　APP-VUE
			authState &&
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.lng = res.longitude;
						this.lat = res.latitude;
						this.getStoreAddress();
					},
					fail: err => {
						console.log('确认订单自提位置：', err);
					}
				});
			// #endif
			// #ifdef H5
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.lng = res.longitude;
					this.lat = res.latitude;
					this.getStoreAddress();
				}
			});
			// #endif
		},
		// 获取商品支持的自提点。
		getStoreAddress() {
			let that = this;
			that.$http('goods.storeAddress', {
				id: that.currentGoodsId,
				latitude: that.lat,
				longitude: that.lng
			}).then(res => {
				if (res.code == 1) {
					that.storeInfo = res.data.data[0];
					that.storeList = res.data.data;
				}
			});
		},
		// 订单信息
		getPre() {
			let that = this;
			that.$http('order.pre', {
				address_id1: that.addressId1,
				coupons_id: that.couponId,
				remark: that.remark,
				address_id2: that.addressId2,
				goods_money: that.goods_money,
				order_type: that.orderType,
				buy_type: that.grouponBuyType,
				pro_id:that.pro_id,
				special_id:that.special_id,
				fee:that.fee,
			}).then(res => {
				if (res.data) {
					that.orderPre = res.data;
				}
			});
		},
		// 获取收费信息
		getProperties() {
			let that = this;
			that.$http('fee_settings.index', {
				area_id:0
			}).then(res => {
				if (res.data) {
					that.properties = res.data.properties;
					that.special = res.data.special;
				}
			});
		},
		// 提交订单
		subOrder() {
			let that = this;
			that.isDisabled = true;
			that.$http(
				'order.createOrder',
				{
					goods_list: that.goodsList,
					address_id1: that.addressId1,
					coupons_id: that.couponId,
					remark: that.remark,
					address_id2: that.addressId2,
					goods_money: that.goods_money,
					order_type: that.orderType,
					buy_type: that.grouponBuyType,
					checkTimeCur: that.checkTimeCur,
					groupon_id: that.grouponId,
					pro_id:that.pro_id,
					special_id:that.special_id,
					fee:that.fee,
				},
				'提交中...'
			).then(res => {
				that.isDisabled = false;
				if (res.code === 1) {
					that.getCartList();
					that.$Router.replace({
						path: res.data.status > 0 ? `/pages/order/payment/result` : `/pages/order/payment/method`,
						query: {
							orderId: res.data.id,
							payState: res.data.status > 0 ? 'success' : 'paying'
						}
					});
				}
			});
		},

		// 初始地址
		getDefaultAddress1() {
			this.$http('address.defaults1', {}, '', false).then(res => {
				if (res.code === 1 && res.data) {
					this.addressData1 = res.data;
					this.addressId1 = res.data.id;
				}
				this.getPre();
			});
		},
		getDefaultAddress2() {
			this.$http('address.defaults2', {}, '', false).then(res => {
				if (res.code === 1 && res.data) {
					this.addressData2 = res.data;
					this.addressId2 = res.data.id;
				}
				this.getPre();
			});
		},
		// 可用优惠券
		getCoupons() {
			let that = this;
			that.$http('order.coupons', {
				goods_list: that.goodsList,
				from: that.from,
				address_id1: that.addressId1,
				address_id2: that.addressId2,
				pro_id: that.pro_id,
				coupons_id: that.couponId,
				order_type: that.orderType
			}).then(res => {
				if (res.code === 1) {
					that.couponList = res.data;
				}
			});
		},

		// 选择优惠券
		selectCoupon(index) {
			this.couponId = index >= 0 ? this.couponList[index].user_coupons_id : 0;
			this.getPre();
		},
		// 显示弹出时间选择
		async changeTime() {
			this.showCheckTime=true
		},
		// 关闭配送方式弹窗
		hideExpressType() {
			this.showExpressType = false;
			this.changeGoodsList();
		},
		// 保存配送方式
		saveExpressType() {
			if (this.expressTypeCur === 'selfetch') {
				if (!this.storeInfo) {
					this.$u.toast('暂无自提点，请选择其他配送方式');
					return false;
				}
				if (!this.isProtocol) {
					this.$u.toast('请先勾选门店协议');
					return false;
				}
			}

			this.showExpressType = false;
			this.changeGoodsList();
			this.getPre();
		},

		// 更改提交数据
		changeGoodsList() {
			this.goodsList.forEach(goods => {
				if (goods.goods_id == this.currentGoodsId && this.currentSkuId == goods.sku_price_id) {
					goods.dispatch_type = this.expressTypeCur;
					goods.dispatch_phone = this.selfPhone;
					goods.dispatch_date = this.checkTime['day'][this.checkDayCur].value + ' ' + this.checkTime['time'][this.checkTimeCur] + ':00';
					if (this.expressTypeCur == 'selfetch') {
						if (!this.storeInfo) {
							this.$u.toast('暂无自提点，请选择其他配送方式');
							return false;
						}
						goods.store_id = this.storeInfo.id;
					}
					goods.checkDayCur = this.checkDayCur;
					goods.checkTimeCur = this.checkTimeCur;
				}
			});
		},

		// 选择快递方式
		changeExpressType(cur) {
			this.expressTypeCur = cur;
			this.getFocus = false;
			cur === 'selfetch' && !this.lat && this.getLocation();
		},
		change_sku() {
			this.showSku = true;
		},
		// 是否同意协议
		checkProtocol() {
			this.isProtocol = !this.isProtocol;
		},
		// 选择配送时间
		checkExpressTime(type) {
			switch (type) {
				case 'store':
					this.checkType = '配送';
					break;
				case 'selfetch':
					this.checkType = '自提';
					break;
				default:
					this.checkType = '自提';
			}
			this.showCheckTime = !this.showCheckTime;
		}
	}
};
</script>

<style lang="scss">
// 收货地址栏
.head_box {
	background-color: #fff;
}
.add-address-box {
	min-height: 100rpx;
	background: url($IMG_URL+'/imgs/order/order_address_line.png') no-repeat;
	background-size: 100% auto;
	background-position: bottom center;
	.select-notice {
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 40rpx;
	}

	.name {
		font-size: 40rpx;
		font-weight: 500;
		color:white;
	}
	.phone {
		font-size: 30rpx;
		font-weight: 500;
		color:white;
	}

	.phone {
		margin: 0 20rpx;
		color:white;
	}

	.tag {
		background: rgba(233, 191, 113, 0.2);
		border-radius: 6rpx;
		padding: 0 16rpx;
		line-height: 38rpx;
		color:white;
		// color: #a8700d;
		font-size: 22rpx;
	}

	.detail {
		
		.address {
			margin-top: 25rpx;
			width: 543rpx;
			font-size: 26rpx;
			
			font-weight: 400;
			color:white;
			// color: rgba(153, 153, 153, 1);
			line-height: 40rpx;
		}
	}
}

// 备注
.remark-box {
	margin-top: 20rpx;
	background: #fff;
	padding: 25rpx;
	.item-input {
		flex: 1;
		text-align: end;
		font-size: 28rpx;
	}
	.input-pl {
		color: #c4c4c4;
	}
}

// 商品卡片
.goods-list {
	background: #fff;
	margin-top: 20rpx;
	.goods-card {
		min-height: 200rpx;
		.goods-price {
			font-size: 30rpx;
			font-weight: 500;
			width: 480rpx;
			color: #333333;
			.goods-num {
				font-size: 28rpx;
				color: #c4c4c4;
			}
		}
		.order-sku {
			font-size: 24rpx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			width: 440rpx;
			margin-bottom: 20rpx;
			.order-num {
				margin-right: 10rpx;
			}
		}
	}
}
.item-list2 {
	height: 100rpx;
	background: #fff;
	padding: 0 25rpx;
	flex:display;
    position: absolute;
        bottom: 0px;
        width: 400px;
	.item-title {
		font-size: 28rpx;
		margin-right: 20rpx;
		.activity-title {
			font-size: 26rpx;
			color: #999;
		}
	}

	.detail {
		font-size: 28rpx;
		color: #333;
		display: flex;
	}
	.origin-price {
		font-size: 26rpx;
		color: #666;
		text-decoration: line-through;
	}

	.price {
		font-size: 26rpx;
		color: #ff0000;
		margin-right: 40rpx;
	}
	.sel-coupon {
		font-size: 26rpx;
		color: #c4c4c4;
		margin-right: 20rpx;
	}
	.cuIcon-right {
		color: #c4c4c4;
	}
}
.item-list {
	height: 47px;
	background: #fff;
	padding: 0 25rpx;

	.item-title {
		font-size: 28rpx;
		margin-right: 20rpx;
		.activity-title {
			font-size: 26rpx;
			color: #999;
		}
	}

	.detail {
		font-size: 28rpx;
		color: #333;
		display: flex;
	}
	.origin-price {
		font-size: 26rpx;
		color: #666;
		text-decoration: line-through;
	}

	.price {
		font-size: 26rpx;
		color: #ff0000;
		margin-right: 40rpx;
	}
	.sel-coupon {
		font-size: 26rpx;
		color: #c4c4c4;
		margin-right: 20rpx;
	}
	.cuIcon-right {
		color: #c4c4c4;
	}
}
.logistic,
.price-box,
.remark-box,
.score,
.coupon {
	border-top: 1rpx solid rgba(#dfdfdf, 0.5);
}
.border-top {
	border-top: 1rpx solid rgba(#dfdfdf, 0.5);
}

.foot-box-wrap {
	height: calc(100rpx + env(safe-area-inset-bottom) / 2);
	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	position: relative;
	width: 100%;
	z-index: 70;
}
.foot-box {
	position: fixed;
	display: flex;
	align-items: center;
	width: 100%;
	height: calc(100rpx + env(safe-area-inset-bottom) / 2);
	border-top: 1rpx solid #eeeeee;
	background-color: #fff;
	z-index: 998;
	bottom: 0;
	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	padding: 0 30rpx;
	.btn-hover {
		color: #fff;
	}
	.num {
		font-size: 26rpx;
		color: #999;
	}

	.all-money {
		margin: 0 60rpx 0 20rpx;

		.price {
			color: #ff0000;
		}
	}

	.sub-btn {
		width: 210rpx;
		line-height: 70rpx;
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		border-radius: 50rpx;
		font-size: 28rpx;
		color: #fff;
	}
}
// 弹窗之配送方式
// 配送方式
.express-type {
	width: 750rpx;
	background-color: #fff;
	border-radius: 20rpx 20rpx 0 0;
	height: 700rpx;
	overflow: visible;
	.express-type__head {
		width: 100%;
		height: 80rpx;
		background: #f8e3bd;
		border-radius: 20rpx 20rpx 0 0;
		&-nav {
			width: (750rpx/4);
			position: relative;
			height: 100%;
		}
		.head-nav--active {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			background: #fff;
			width: 100%;
			height: 80rpx;
			background-color: #fff;
			border-radius: 20rpx 20rpx 0px 0px;
			&::after {
				content: '';
				display: block;
				width: 40rpx;
				height: 80rpx;
				position: absolute;
				transform: skewX(20deg);
				background: #fff;
				border-top-right-radius: 20rpx;
				top: 0;
				right: -15rpx;
			}
			&::before {
				content: '';
				display: block;
				width: 40rpx;
				height: 80rpx;
				position: absolute;
				transform: skewX(-20deg);
				background: #fff;
				border-top-left-radius: 20rpx;
				top: 0;
				left: -15rpx;
			}
		}
		.head-nav__left--active {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			background: #fff;
			width: 100%;
			height: 74rpx;
			background-color: #fff;
			border-radius: 20rpx 20rpx 0px 0px;
			&::after {
				content: '';
				display: block;
				width: 40rpx;
				height: 74rpx;
				position: absolute;
				transform: skewX(20deg);
				background: #fff;
				border-top-right-radius: 20rpx;
				top: 0;
				right: -15rpx;
			}
		}
		.head-nav__right--active {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			background: #fff;
			width: 100%;
			height: 74rpx;
			background-color: #fff;
			border-radius: 20rpx 20rpx 0px 0px;
			&::before {
				content: '';
				display: block;
				width: 40rpx;
				height: 74rpx;
				position: absolute;
				transform: skewX(-20deg);
				background: #fff;
				border-top-left-radius: 20rpx;
				top: 0;
				left: -15rpx;
			}
		}
		.head-nav__title {
			font-size: 24rpx;
			font-weight: 500;
			color: #666;
			position: relative;
			z-index: 6;
		}
		.head-nav__title--active {
			color: #a8700d;
			font-size: 26rpx;
		}
	}
	.express-type__content {
		.empty-address {
			height: 120rpx;
			padding: 0 25rpx;
			font-size: 28rpx;

			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}
		// 无定位
		.location-box {
			height: 500rpx;
			justify-content: center;
			.nolocation-img {
				width: 74rpx;
				height: 90rpx;
				margin-bottom: 40rpx;
			}
			.location-title {
				font-size: 35rpx;

				font-weight: bold;
				color: rgba(70, 53, 27, 1);
				margin-bottom: 20rpx;
			}
			.location-tip {
				font-size: 28rpx;

				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				margin-bottom: 40rpx;
			}
			.open-location {
				width: 492rpx;
				line-height: 70rpx;
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
				box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
				border-radius: 35rpx;
				font-size: 28rpx;

				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}
		// 快递
		.express-address {
			position: relative;
			padding: 30rpx 25rpx;
			background: url($IMG_URL+'/imgs/order/address_bg.png') no-repeat;
			background-size: 430rpx 300rpx;
			background-position: top right;
			.express-top {
				margin-bottom: 20rpx;
				width: 550rpx;
				text-align: left;
				.address {
					font-size: 28rpx;

					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 40rpx;
					text-align: left;
				}
				.dispatch-notice {
					font-size: 28rpx;

					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 40rpx;
					text-align: left;
				}
				.address-location {
					position: absolute;
					right: 60rpx;
					top: 30rpx;
					.location-img {
						width: 80rpx;
						height: 90rpx;
					}
					.location-text {
						font-size: 18rpx;

						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
				.tag {
					background: rgba(233, 191, 113, 0.2);
					border-radius: 6rpx;
					padding: 0 16rpx;
					line-height: 38rpx;
					color: #a8700d;
					font-size: 22rpx;
					margin-right: 20rpx;
				}
				.tag1 {
					background: rgba(53, 190, 105, 0.2);
					border-radius: 6rpx;
					padding: 0 16rpx;
					line-height: 38rpx;
					color: #1bbc50;
					font-size: 22rpx;
					margin-right: 20rpx;
				}
				.address-guide {
					position: absolute;
					right: 25rpx;
					top: 40rpx;
					color: #999999;
				}
			}

			.express-content {
				margin-bottom: 20rpx;
				.box-line {
					width: 1rpx;
					height: 61rpx;
					border-left: 1rpx solid rgba(238, 238, 238, 1);
					margin: 0 40rpx;
				}
				.phone-box1 {
					.name,
					.phone {
						font-size: 26rpx;

						font-weight: 400;
						color: rgba(102, 102, 102, 1);
					}

					.phone {
						margin-left: 20rpx;
					}
				}
				.time-box,
				.phone-box {
					text-align: left;
					min-height: 120rpx;
					.box-title {
						font-size: 24rpx;

						font-weight: 400;
						color: #666;
						padding-bottom: 10rpx;
					}
					.box-text {
						font-size: 24rpx;

						font-weight: 500;
						color: #333;
					}
					.edit-phone {
						width: 160rpx;
						font-size: 24rpx;

						font-weight: 500;
						color: #333;
					}
					.box-icon {
						font-size: 28rpx;
						color: #999;
						display: inline-block;
						width: 40rpx;
						text-align: center;
						line-height: 40rpx;
					}
				}
			}
			.express-bottom {
				.protocol {
					font-size: 24rpx;

					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					.protocol-text {
						color: #6487a4;
					}
				}
			}
		}
	}
	.express-type__button {
		height: 90rpx;
		padding: 0 30rpx;
		.cancel-btn {
			width: 335rpx;
			line-height: 74rpx;
			background: rgba(238, 238, 238, 1);
			border-radius: 37rpx;
			font-size: 28rpx;
	
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}
		.save-btn {
			width: 335rpx;
			line-height: 74rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border-radius: 37rpx;
			font-size: 28rpx;
	
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
	}
	.express-type__bottom {
		height: 90rpx;
		padding: 0 30rpx;
		.cancel-btn {
			width: 335rpx;
			line-height: 74rpx;
			background: rgba(238, 238, 238, 1);
			border-radius: 37rpx;
			font-size: 28rpx;

			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}
		.save-btn {
			width: 335rpx;
			line-height: 74rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border-radius: 37rpx;
			font-size: 28rpx;

			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
	}
}

// 选择配送给时间
.checkTime-box {
	background: rgba(255, 255, 255, 1);
	border-radius: 20rpx 20rpx 0px 0px;
	height: 720rpx;
	text-align: center;
	.checkTime-head {
		font-size: 32rpx;

		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 100rpx;
		position: relative;
	}
	.checkTime-foot {
		height: 100rpx;
		.save-btn {
			width: 690rpx;
			line-height: 80rpx;
			background: linear-gradient(90deg, rgba(240, 199, 133, 1), rgba(246, 214, 157, 1));
			border-radius: 40rpx;
			font-size: 30rpx;

			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}
	.menu-box {
		flex-wrap: wrap;
		// margin: 30rpx;
		position: fixed;
		width: 750rpx;
		bottom: 0;
		z-index: 10;
		.menu-item {
			width: (690rpx/4);
			margin-bottom: 50rpx;
			.item-img {
				width: 10rpx;
				height: 10rpx;
			}
			.item-title {
				font-size: 24rpx;
				font-weight: 600;
				color: #fff;
				line-height: 30rpx;
				margin-top: 16rpx;
			}
		}
	}
	.head-wrap {
		powidth: 100%;
		height: 100%;
		.merchant-btn {
			width: 178rpx;
			height: 64rpx;
			line-height: 64rpx;
			background: #ffffff;
			border-radius: 32rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #a8700d;
		}
	}
	
	.checkTime-content {
		.checkTime-content__left {
			height: 100%;
			width: 190rpx;
			background: #f5f5f5;
			.left-item {
				font-size: 26rpx;

				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				height: 100rpx;
				width: 100%;
			}
		}
		.checkTime-content__right {
			flex: 1;
			height: 100%;
			overflow-y: auto;
			.right-item {
				font-size: 26rpx;

				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				width: 100%;
				text-align: center;
				border-bottom: 1rpx solid rgba(#dfdfdf, 0.6);
				margin: 0 30rpx;
				line-height: 100rpx;
			}
		}
		.item--active {
			font-size: 26rpx;

			font-weight: 500;
			color: rgba(168, 112, 13, 1) !important;
			background-color: #fff;
		}
	}
}
</style>

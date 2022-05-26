<!--
 * @Author: your name
 * @Date: 2021-12-22 17:11:33
 * @LastEditTime: 2021-12-22 17:20:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \therealoneiscoming-1\am-app\src\views\manager\com.vue
-->
<template>
    <briup-fulllayout title="工单详情">
        <van-cell-group>
            <van-field readonly v-model="orderData.type" label="工单类型" />
            <van-field readonly v-model="orderData.status" label="工单状态" />
            <van-field readonly v-model="orderData.engineer_name" label="项目名称" />
            <van-field readonly v-model="orderData.device_name" label="设备名称" />
            <van-field v-if="orderData.bill_why" readonly v-model="orderData.bill_why" label="申报原因" />
            <van-field v-else readonly label="申报原因" value="无" />
            <van-field readonly label="申报图片" :value="orderData.begin_photos && orderData.begin_photos.length > 0?'':'暂无图片'" />
            <div v-if="orderData.begin_photos && orderData.begin_photos.length > 0">
                <van-image style="padding:5px" @click="openPhoto(orderData.begin_photos)" v-for="(item,index) in orderData.begin_photos" :key="index" width="30%" height="100" :src="item" />
            </div>
            <!-- 进行中页面  上传图片 -->
            <van-field v-if="orderData.status == '进行中'" readonly label="处理现场" />
            <div style="padding:0 70px;box-sizing:border-box">
                <el-upload action="http://121.199.29.84:8001/file/upload" id="upPhoto" v-if="orderData.status == '进行中'" :limit='3' list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <!-- 已完成列表展示处理完的图片 -->
            <van-field readonly v-if="orderData.status == '已完成'" label="处理现场" :value="orderData.end_photos && orderData.end_photos.length > 0?'':'暂无图片'" />
            <div v-if="orderData.status == '已完成' && orderData.end_photos && orderData.end_photos.length > 0">
                <van-image style="padding:5px" @click="openPhoto(orderData.end_photos)" v-for="(item,index) in orderData.end_photos" :key="index" width="30%" height="100" :src="item" />
            </div>
        </van-cell-group>
        <div style="padding:20px 5px">
            <van-button v-if="orderData.status == '待接单'" @click="submitHandler" block type="info">确认接单</van-button>
            <van-button v-if="orderData.status == '进行中'" @click="submitSuccessHandler" block type="info">确认完成</van-button>
        </div>
    </briup-fulllayout>
</template>

<script>
import { get, server } from '../../../http/axios'
import { ImagePreview, Toast } from 'vant';
export default {
    data() {
        return {
            orderData: {},
            userId: this.$store.state.user.info.id,
            fileList: [],
            photoList: [],
            form: {},
        }
    },
    created() {
        this.orderData = this.$route.query ? this.$route.query : {}
    },

    methods: {
        // 确认接单按钮
        submitHandler() {
            let param = {
                id: this.orderData.id,
                account_id: this.userId
            }
            get('/workorder/takeOrder', param).then(res => {
                if (res && res.status == 200) {
                    Toast.success('接单成功');
                    this.$router.go(-1)
                } else {
                    Toast.fail('接单失败');
                }
            })
        },
        // 放大图片
        openPhoto(row) {
            ImagePreview(row)
        },
        // 确认完成按钮
        submitSuccessHandler() {
            let param = {
                id: this.orderData.id,
                finish_time: new Date().getTime()
            }
            if (this.photoList.length > 0) {
                this.photoList.forEach((k, i) => {
                    param[`photo${i+1}`] = k
                })
            }
            get('/workorder/finishOrder', param).then(res => {
                if (res && res.status == 200) {
                    Toast.success('工单已处理完毕');
                    this.$router.go(-1)
                } else {
                    Toast.fail('确认失败');
                }
            })
        },

        // 更换头像 成功后
        handleAvatarSuccess(res) {
            this.photoList.push('http://121.199.29.84:8888/group1/' + res.data.id)
            
        },
        // 更换头像之前  格式大小限制
        beforeAvatarUpload(file) {
            const isLt3M = file.size / 1024 / 1024 < 3;
            if (file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png') {
                this.$message.error('请选择正确的图片格式');
                return false
            }
            if (!isLt3M) {
                this.$message.error('上传图片大小不能超过 3MB!');
                return false
            }
        },
        // 删除
        handleRemove(file, fileList) {
            let arr = []
            this.photoList.forEach(k=>{
                if(k != 'http://121.199.29.84:8888/group1/'+file.response.data.id){
                    arr.push(k)
                }
            })
            this.photoList = arr
        },

    }
}
</script>

<style scoped>
.van-image {
    width: 33.3%;
}

.van-cell .van-cell_title {
    flex: 0.6
}

.van-cell .van-cell_value {
    flex: 1.4
}

.van-uploader {
    /* width: 25%; */
    /* text-align: center; */
    box-sizing: border-box;
    padding: 10px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
}

.avatar {
    width: 130px;
    height: 130px;
    display: block;
}
</style>
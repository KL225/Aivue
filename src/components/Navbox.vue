<template>
    <div class="navbar">
        <div class="flex-box">
            <el-button @click="handleCollapse">
                <el-icon><Expand /></el-icon>
            </el-button>
            <p class="pagt">{{ routeTitle }}</p>
        </div>
        <div class="flex-box">
            <el-dropdown @command="handleCommand">
                <div class="flex-box">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                  <p class="user-name">admin</p>
                  <el-icon><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { ref,computed } from 'vue'
import { useAdminStore } from '../stroes/admin'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { logout } from '@/api/admin'

const route = useRoute()
const router = useRouter()
const routeTitle = computed(() => route.meta.title)


const handleCommand = (command) =>{
    if(command === 'logout'){
        ElMessageBox.confirm('确定退出登录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //退出登入
            logout().then(() => {
                // 清除缓存
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                // 跳转到登录页
                router.push('/auth/login')
            })    
        })
    }
}
const handleCollapse = () => {
    useAdminStore().toggleCollapse()
}
</script>
<style lang="scss" scoped>
.navbar{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #e5e7ed;
    box-shadow: 0 1px 4px rgba(0,21,41,0.08);
    
    .flex-box{
        display: flex;
        justify-content: center;
        align-items: center;
        .pagt{
            font-size: 26px;
            font-weight: bold;
            margin-left: 20px;
            color: #1f2937;
        }
    }
}
</style>
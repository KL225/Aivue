<template>
  <div class="backend-layout">
    <el-container class=" main-container">
      <el-aside :width="isCollapse ? '64px' : '264px'">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header class="header">
            <Navbox />
        </el-header>
        <el-main>
            <router-view class="center"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import Sidebar from './Sidebar.vue'
import Navbox from './Navbox.vue'
import {useAdminStore} from '../stroes/admin'

const isCollapse = computed(() => useAdminStore().isCollapse)
</script>

<style lang="scss" scoped>
.backend-layout {
    height: 100vh;
    .el-header{
      height: 74px;
    }
    .main-container{
      height: 100%;
      .header{
        padding: 0;
      }
      .center{
        padding: 20px;
        background-color: #fff;
        min-height: calc(100% - 74px);
      }
    }
}
</style>

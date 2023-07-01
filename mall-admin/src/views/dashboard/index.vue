<script lang="ts">
export default { name: 'Dashboard' };
</script>

<script setup lang="ts">
// 组件引用
import GithubCorner from '@/components/GithubCorner/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import BarChart from './components/Chart/BarChart.vue';
import PieChart from './components/Chart/PieChart.vue';
import RadarChart from './components/Chart/RadarChart.vue';

import Project from './components/Project/index.vue';
import Team from './components/Team/index.vue';
import useStore from '@/store';
import {localStorage} from "@/utils/storage";

function jumpAPP(app: string) {
  app+= '/#/dashboard?token=' + encodeURIComponent(localStorage.get('token'));
  window.open(app, '_self')
}
</script>

<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />
    <!-- 数据 -->
    <el-row :gutter="40" class="card-panel__col">
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
        <el-link @click="jumpAPP('http://10.0.50.10:32201')">
          <el-card>
            <div class="app-link">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
              <div class="card-panel-text">APP1</div>
            </div>
          </el-card>
        </el-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
        <el-link @click="jumpAPP('http://10.0.50.10:32202')">
          <el-card>
            <div class="app-link">
              <svg-icon icon-class="message" class-name="card-panel-icon" />
              <div class="card-panel-text">APP2</div>
            </div>
          </el-card>
        </el-link>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .app-link {
    display: inline-block;
    text-align: center;
    color: #40c9c6;
    .svg-icon {
      font-size: 30px;
      margin: 10px;
    }
  }

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
    z-index: 99;
  }

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .user-profile {
    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .card-panel__col {
    margin-bottom: 12px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-user {
        background: #e77541;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;

      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .icon-message {
      color: #36a3f7;
      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .icon-money {
      color: #f4516c;

      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .icon-shopping {
      color: #34bfa3;

      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 20px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        text-align: right;
      }
    }
  }

  .chart-container {
    background: #ffffff;
  }
}
</style>

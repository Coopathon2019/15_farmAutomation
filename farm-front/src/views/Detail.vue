<template>
    <div class="detail">
        <div class="area-title">
            <div class="menu" @click="$router.go(-1)">
                <icon name="chevron-left" width="20" height="20" />
            </div>
            {{ $route.params.farm }}
        </div>
        <div class="table-wrap">
            <div class="farm-info">
                <!-- 地區名稱 -->
                <div class="area">
                    <div class="title">
                        Area
                    </div>
                    <div class="value">
                        {{ $route.params.area }}
                    </div>
                </div>
                <!-- 基本水位所需時間 -->
                <div class="area">
                    <div class="title">
                        BWH
                    </div>
                    <div class="value">
                        {{ currentFarm.timeLeftToBWH }}
                    </div>
                </div>
                <!-- 水量流速 -->
                <div class="area">
                    <div class="title">
                        Rate
                    </div>
                    <div class="value">
                        {{ currentFarm.speed }} ml/s
                    </div>
                </div>
                <!-- 農地所需cc數 -->
                <div class="area">
                    <div class="title">
                        Size
                    </div>
                    <div class="value">
                        {{ currentFarm.size }} ml
                    </div>
                </div>
                <!-- 目前水位高度 -->
                <div
                    :class="[
                        'area',
                            {
                                over: currentFarm.waterHeight >= MaxWH,
                                under: currentFarm.waterHeight <= BWH,
                                ideal: currentFarm.waterHeight > BWH && currentFarm.waterHeight < MaxWH,
                            }
                    ]"
                >
                    <div class="title">
                        Water height
                    </div>
                    <div class="value">
                        {{ (currentFarm.waterHeight).toFixed(2) }} %
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            hasMenu: false,
        };
    },
    computed: {
        ...mapGetters({
            currentFarmList: 'getCurrentFarmList',
            BWH: 'getBWH',
            MaxWH: 'getMaxWH',
        }),
        currentFarm() {
            return this.currentFarmList.filter(item => item.text === this.$route.params.farm)[0];
        },
    },
}
</script>

<style lang="scss" scoped src="@/css/Detail.scss">

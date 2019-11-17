<template>
    <div class="home">
        <!-- 地區名稱 -->
        <div class="area-title">
            <div class="menu" @click="hasMenu = !hasMenu">
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                    <g class="style-scope yt-icon">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" class="style-scope yt-icon"></path>
                    </g>
                </svg>
            </div>
            <transition name="fade">
                <div v-if="hasMenu" class="menu-list">
                    <div
                        v-for="(area, index) in currentAreaList"
                        :key="`area${index}`"
                        class="area"
                        @click="changeArea(area)"
                    >
                        {{ area }}
                    </div>
                </div>
            </transition>
            {{ curArea }}
        </div>
        <!-- 該地區下所有農地基本資料 -->
        <div class="farm-flexbox">
            <div
                v-for="(farmInfo, index) in filterFarms"
                :key="`farm-${index}`"
                class="farm-wrap"
            >
                <!-- 水閘門關閉狀態 -->
                <div class="checkbox">
                    Gate Closed:
                    <div class="container">
                        <div class="custom-checkbox" @click="switchGate(farmInfo.id)">
                            <input type="checkbox" :checked="farmInfo.checked">
                            <div class="checkbox-btn"></div>
                        </div>
                    </div>
                </div>
                <div class="farm-border-wrap">
                    <div class="farm-info-wrap" @click="readDetail(farmInfo.text)">
                        <div class="water-height-wrap">
                            <!-- 水位高度 -->
                            <div class="water-height">
                                Water height:
                                <span
                                    :class="[
                                        'water-height',
                                        {
                                            over: farmInfo.waterHeight >= MaxWH,
                                            under: farmInfo.waterHeight <= BWH,
                                            ideal: farmInfo.waterHeight > BWH && farmInfo.waterHeight < MaxWH,
                                        }
                                    ]"
                                >
                                    {{ (farmInfo.waterHeight).toFixed(2) }}%
                                </span>
                            </div>
                            <!-- 水量流速 -->
                            <div class="speed">
                                Flow Rate: {{ farmInfo.speed }} ml/s
                            </div>
                            <!-- 到達基本水位時間 -->
                            <div class="time-left-to-fill">
                                BWH time left: {{ farmInfo.timeLeftToBWH }}
                            </div>
                        </div>
                        <p
                            :class="[
                                'text',
                                {
                                    over: farmInfo.waterHeight >= MaxWH,
                                    under: farmInfo.waterHeight <= BWH,
                                    ideal: farmInfo.waterHeight > BWH && farmInfo.waterHeight < MaxWH,
                                }
                            ]"
                        >
                            {{ farmInfo.text }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            hasMenu: false,
            curArea: 'Asia',
        };
    },
    computed: {
        ...mapGetters({
            currentFarmList: 'getCurrentFarmList',
            currentAreaList: 'getCurrentAreaList',
            BWH: 'getBWH',
            MaxWH: 'getMaxWH',
        }),
        filterFarms() {
            return this.currentFarmList.filter(item => item.area === this.curArea);
        },
    },
    methods: {
        ...mapActions(['actionSetCurrentFarmList']),
        readDetail(val) {
            this.$router.push(`/detail/${this.curArea}/${val}`);
        },
        changeArea(val) {
            this.curArea = val;
            this.hasMenu = false;
        },
        switchGate(index) {
            const farmList = this.currentFarmList;
            this.actionSetCurrentFarmList(farmList.map((farm, subIndex) => {
                if (index === subIndex) {
                    return {
                        ...farm,
                        checked: !farm.checked,
                    }
                }

                return farm;
            }))
        },
    },
};
</script>

<style lang="scss" scoped src="@/css/Home.scss">

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import moment from 'moment';
import apiUrl from '@/config/api';

Vue.use(Vuex)

// 仿效 socket Server(未來導入從這個著手)
let socketTemporary;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export default new Vuex.Store({
    state: {
        currentFarmList: [],
        currentAreaList: [
            'Asia',
            'America',
            'Europe',
            'Africa'
        ],
        BWH: 10,
        MaxWH: 25,
    },
    getters: {
        getCurrentFarmList: state => state.currentFarmList,
        getCurrentAreaList: state => state.currentAreaList,
        getBWH: state => state.BWH,
        getMaxWH: state => state.MaxWH,
    },
    mutations: {
        setCurrentFarmList(state, val) {
            state.currentFarmList = val;
        },
        setCurrentAreaList(state, val) {
            state.currentAreaList = val;
        },
    },
    actions: {
        actionInit({ state, dispatch, commit }) {
            axios.get(`${apiUrl}/farm_list`)
                .then((response) => {
                    dispatch('actionSetCurrentFarmList', response.data);
                });

            socketTemporary = setInterval(() => {
                let updateFarmList = state.currentFarmList;
                updateFarmList = updateFarmList.map((farm) => {
                    if (farm.checked) {
                        return farm;
                    }

                    return {
                        ...farm,
                        currentSize: farm.currentSize + farm.speed,
                        timeLeftToBWH: moment(((farm.size - farm.currentSize) / farm.speed) * 1000).format('h:mm:ss'),
                        waterHeight: (farm.currentSize / farm.size) * 100,
                        speed: getRandomInt(farm.speed - 1, farm. speed + 3),
                    };
                });
                commit('setCurrentFarmList', updateFarmList)
            }, 1000);
        },
        actionSetCurrentFarmList({ commit }, val) {
            commit('setCurrentFarmList', val.map((farm) => {
                return {
                    ...farm,
                    timeLeftToBWH: moment((farm.size / farm.speed) * 1000).format('h:mm:ss'),
                };
            }));
        },
        actionSetCurrentAreaList({ commit }, val) {
            commit('setCurrentAreaList', val);
        },
        actionBreakTimeInterval() {
            clearInterval(socketTemporary);
        },
    },
})

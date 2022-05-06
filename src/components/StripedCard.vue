<template>
  <div class="divide-y divide-gray-300/50">
    <div class="space-y-6 py-4 text-base leading-7 text-gray-600">
      <div class="space-y-4">
        <div class="flex flex-row flex-wrap items-center mt-2 gap-y-4 gap-x-2">
          <div class="flex-1 w-full relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">
                <SearchCircleIcon class="h-6 w-6" />
              </span>
            </div>
            <input v-model.trim="input" v-on:blur="search(input)" v-on:keyup.enter="search(input)"
              v-on:focus="input = ''" type="text" id="search"
              class="focus:ring-amber-400 focus:border-amber-400 bg-amber-50 focus:bg-amber-100 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-lg"
              placeholder="輸入要搜尋ㄉ地方..." />
          </div>
          <div class="flex-initial">
            <button v-on:click="search"
              class="flex w-full justify-center items-center bg-amber-500 hover:bg-amber-600 border border-transparent rounded-lg py-1.5 px-4 text-amber-50 border-amber-500">
              <SearchCircleIcon class="h-7 w-7 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-4 leading-7 ">
      <div class="bg-amber-50 overflow-hidden sm:rounded-lg ">
        <div class="bg-amber-100 px-4 py-4 sm:px-6 rounded-lg">
          <h3 class="text-lg leading-6 font-medium text-amber-600">
            <RefreshIcon v-if="isLoading" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
            <div v-else>
              找到惹🥺
            </div>
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-600">{{ state }}</p>
        </div>
        <div class="flex-initial">
          <dl>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-amber-600">名字</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2" id="name">{{ detail.name }}</dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:w-[432px] rounded-lg">
              <dt class="text-sm font-medium text-amber-600">地址</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2" id="formatted_address">{{
                  detail.formatted_address
              }}
              </dd>
            </div>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-amber-600">營業時間</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 whitespace-pre-wrap" id="opening_hours_text">
                {{
                    detail.opening_hours_text ? detail.opening_hours_text : "找不到耶🥺"
                }}</dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">電話</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2" id="formatted_phone_number"> {{
                  detail.formatted_phone_number ?
                    detail.formatted_phone_number : "找不到耶🥺"
              }}</dd>
            </div>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">評價</dt>
              <dd class="flex mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 items-center" id="rating"> {{
                  detail.rating ? detail.rating : "找不到耶🥺"
              }}
                <StarIcon v-if="detail.rating != undefined" class="flex h-4 w-4 ml-0.5" />
              </dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">價錢</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2" id="price_level">
                <div v-if="'price_level' in detail" class="flex justify-start items-center">
                  {{ price_leval_table[parseInt(detail.price_level)] }}
                  <div v-for="i in parseInt(detail.price_level)" :key="i">
                    <CurrencyDollarIcon class="flex h-4 w-4" />
                  </div>
                </div>
                <div v-else>
                  找不到耶🥺
                </div>
              </dd>
            </div>
            <div class="mt-2 flex px-4 py-5 sm:px-6 rounded-lg justify-center">
              <button type="button" v-on:click="copy"
                class="inline-flex items-center px-3 py-2 font-semibold leading-6 text-sm shadow rounded-md text-amber-50 bg-amber-500 hover:bg-amber-600 transition ease-in-out duration-150"
                v-bind:class="{ 'bg-teal-600 hover:bg-teal-700 text-teal-50': copied == 2, 'bg-pink-600 hover:bg-pink-700 text-pink-50': copied == 3 }">
                <div v-if="copied == 2" class="flex items-center">
                  <ClipboardCheckIcon class="h-5 w-5 mr-2" />
                  複製好惹
                </div>
                <div v-if="copied == 3" class="flex items-center">
                  <ExclamationCircleIcon class="h-5 w-5 mr-2" />
                  複製出錯惹🥺
                </div>
                <div v-if="copied == 1" class="flex items-center">
                  <ClipboardIcon class="h-5 w-5 mr-2" />
                  複製到剪貼簿
                </div>
              </button>

            </div>
            <div class="mt-3 rounded-lg overflow-hidden flex">
              <div class="h-full flex-1 rounded-lg items-center aspect-square" id="map">
              </div>
              <div id="map2" hidden></div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PaperClipIcon, RefreshIcon, ClipboardIcon, ClipboardCheckIcon, SearchCircleIcon, StarIcon, CurrencyDollarIcon, ExclamationCircleIcon, FastForwardIcon, } from '@heroicons/vue/outline'

// Google Map API Global Var ><
let map;
let service;
let infowindow;
let markers = [];

export default {
  data() {
    return {
      map: map,
      infowindow: infowindow,
      service: service,
      detail: {},
      markers: markers,
      input: '',
      state: '等待中...',
      copied: 1,
      isLoading: true,
      price_leval_table: ["免費", "便宜", "中等", "貴", "超貴"],
    }
  },
  components: {
    PaperClipIcon,
    RefreshIcon,
    ClipboardIcon,
    ClipboardCheckIcon,
    SearchCircleIcon,
    StarIcon,
    CurrencyDollarIcon,
    ExclamationCircleIcon,
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 22.9988945, lng: 120.216945 },
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false
      });
      this.infowindow = new google.maps.InfoWindow();
      this.service = new google.maps.places.PlacesService(this.map);
      this.setDetails("ChIJ0yAIKe12bjQRnqEH4osC7uA"); // 成大 PlaceId
      this.map.addListener("click", (e) => {
        console.log(e.placeId);
        this.setDetails(e.placeId);
      });
    },
    search(input) {
      const request = {
        query: input,
        fields: ["name", "geometry", "place_id"],
      };
      // var addMarker = this.addMarker, map = this.map, removeAllMarker = this.removeAllMarker, setDetails = this.setDetails;
      // 這個 js 變數 scope 問題，需要請教大佬 
      this.service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // this.state = `找到 ${results.length} 個地點！`;
          this.removeAllMarker();
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            if (!place.geometry || !place.geometry.location) continue;
            this.addMarker(place.geometry.location);
          }
          this.map.setCenter(results[0].geometry.location);
          this.setDetails(results[0].place_id);
        }
      });
    },
    addMarker(position) {
      const marker = new google.maps.Marker({
        map: this.map,
        position: position,
      });
      this.markers.push(marker);
    },
    removeAllMarker() {
      console.log(this.markers);
      var map = new google.maps.Map(document.getElementById("map2"));
      for (let i = 0; i < this.markers.length; i++)
        this.markers[i].setMap(map);
      this.markers = [];
    },
    setDetails(placeId) {
      const request = {
        placeId: placeId,
        fields: ["name", "geometry", "formatted_address", "place_id", "opening_hours.weekday_text", "rating", "price_level", "formatted_phone_number", "plus_code.compound_code"],
      };
      this.service.getDetails(request, (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          // this.addMarker(place.geometry.location);
          this.detail = place;
          // this.input = place.name;
          this.isLoading = false;
          this.detail.opening_hours_text = "";
          if ("opening_hours" in place && "weekday_text" in place.opening_hours) {
            for (let weekday of place.opening_hours.weekday_text)
              this.detail.opening_hours_text += weekday + '\n';
          }
          this.state = place.plus_code != undefined ? place.plus_code.compound_code.split(" ")[1] : place.formatted_address;
        }
      });
    },
    copyBtnRender(state) {
      this.copied = state;
      setTimeout(() => {
        this.copied = 1;
      }, "2000");
    },
    copy() {
      let content = '';
      var itemDict = { "名字": "name", "地址": "formatted_address", "營業時間": "opening_hours_text", "電話": "formatted_phone_number", "評價": "rating", "價錢": "price_level" }
      for (var key in itemDict)
        content += `${key}：${document.getElementById(itemDict[key]).innerText.trim()}${"\n"}`;
      navigator.clipboard.writeText(content)
        .then(() => {
          this.copyBtnRender(2);
        })
        .catch(err => {
          var textarea = document.createElement("textarea");
          textarea.textContent = content;
          document.body.appendChild(textarea);
          var selection = document.getSelection(), range = document.createRange();
          range.selectNode(textarea);
          selection.removeAllRanges().addRange(range);
          var success = document.execCommand("copy");
          selection.removeAllRanges();
          document.body.removeChild(textarea);
          this.copyBtnRender(2 + !success);
        })
    },
  },
}
</script>
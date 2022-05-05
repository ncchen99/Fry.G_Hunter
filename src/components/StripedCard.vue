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
            <input v-model.trim="input" v-on:blur="search(input)" v-on:keyup.enter="search(input)" type="text"
              id="search"
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
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">{{ detail.name }}</dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:w-[432px] rounded-lg">
              <dt class="text-sm font-medium text-amber-600">地址</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">{{ detail.formatted_address }}
              </dd>
            </div>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-amber-600">營業時間</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{{
                  detail.opening_hours_text
              }}</dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">電話</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2"> {{ detail.formatted_phone_number }}</dd>
            </div>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">評價</dt>
              <dd class="flex mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 items-center"> {{
                  detail.rating
              }}
                <StarIcon v-if="detail.rating != undefined" class="inline h-4 w-4 ml-0.5" />
              </dd>
            </div>
            <div class="flex bg-amber-100 px-4 py-5 sm:px-6 rounded-lg justify-center">
              <button type="button" v-on:click="copy"
                class="inline-flex items-center px-3 py-2 font-semibold leading-6 text-sm shadow rounded-md text-amber-50 bg-amber-500 hover:bg-amber-600 transition ease-in-out duration-150">
                <div v-if="copied" class="flex items-center">
                  <ClipboardCheckIcon class="h-5 w-5 mr-2" />
                  複製好惹
                </div>
                <div v-else class="flex items-center">
                  <ClipboardIcon class="h-5 w-5 mr-2" />
                  複製到剪貼簿
                </div>
              </button>

            </div>
            <div class="mt-3 rounded-lg overflow-hidden flex">
              <div class="h-full flex-1 rounded-lg items-center aspect-square" id="map">
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PaperClipIcon, RefreshIcon, ClipboardIcon, ClipboardCheckIcon, SearchCircleIcon, StarIcon, } from '@heroicons/vue/outline'

// Google Map API Global Var ><
let map;
let service;
let infowindow;

export default {
  data() {
    return {
      map: map,
      infowindow: infowindow,
      service: service,
      detail: {},
      input: '',
      state: '等待中...',
      copied: false,
      isLoading: true,
    }
  },
  components: {
    PaperClipIcon,
    RefreshIcon,
    ClipboardIcon,
    ClipboardCheckIcon,
    SearchCircleIcon,
    StarIcon,
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
      this.setDetails("ChIJ0yAIKe12bjQRnqEH4osC7uA");
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
      this.service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(`找到 ${results.length} 個地點！`);
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            if (!place.geometry || !place.geometry.location) continue;
            const marker = new google.maps.Marker({
              map,
              position: place.geometry.location,
            });
          }
          map.setCenter(results[0].geometry.location);
        }
      });
    },
    setDetails(placeId) {
      const request = {
        placeId: placeId,
        fields: ["name", "geometry", "formatted_address", "place_id", "opening_hours.weekday_text", "rating", "price_level", "formatted_phone_number", "plus_code.compound_code"],
      };
      var map = this.map;
      this.service.getDetails(request, (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
          });

          this.detail = place;
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
    copy() {
      console.log("copy");
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, "2000");
      // TODO 
    },
  },
}
</script>
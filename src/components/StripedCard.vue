<template>
  <div class="divide-y divide-gray-300/50">
    <div class="space-y-6 py-4 text-base leading-7 text-gray-600">
      <div class="space-y-4">
        <div class="flex flex-row flex-wrap items-center mt-2 gap-y-4 gap-x-2">
          <div class="flex-1 w-full relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> </span>
            </div>
            <input v-model.trim="input" v-on:blur="search()" type="text" id="search"
              class="focus:ring-amber-400 focus:border-amber-400 bg-amber-50 focus:bg-amber-100 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-lg"
              placeholder="輸入要搜尋ㄉ地方..." />
          </div>
          <div class="flex-initial">
            <button v-on:click="search"
              class="flex w-full justify-center items-center bg-amber-500 hover:bg-amber-600 border border-transparent rounded-lg py-1.5 px-4 text-amber-50 border-amber-500"><svg
                xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-4 leading-7 ">
      <div class="bg-amber-50 overflow-hidden sm:rounded-lg ">
        <div class="bg-amber-100 px-4 py-4 sm:px-6 rounded-lg">
          <h3 class="text-lg leading-6 font-medium text-amber-600"> {{ input }} </h3>
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
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">{{ detail.opening_hours_text }}</dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">電話</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2"> {{ detail.formatted_phone_number }}</dd>
            </div>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">評價</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2"> {{ detail.rating }} ⭐</dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">剪貼簿</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                <button type="button"
                  class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed "
                  disabled>複製</button>
              </dd>
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
import { PaperClipIcon } from '@heroicons/vue/solid'

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
      input: '今晚我想來點...',
      state: '等待中...',
    }
  },
  components: {
    PaperClipIcon,
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
      this.map.addListener("click", (e) => {
        console.log(e.placeId);
        const request = {
          placeId: e.placeId,
          fields: ["name", "geometry", "formatted_address", "place_id", "opening_hours.weekday_text", "rating", "formatted_phone_number"],
        };
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
          }
        });
      });

    },
    search(event) {
      console.log(this.input);
      const request = {
        query: this.input,
        fields: ["name", "formatted_address", "place_id", "geometry"],
      };
      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            if (!place.geometry || !place.geometry.location) continue;

            marker = new google.maps.Marker({
              map,
              position: place.geometry.location,
            });
          }
          map.setCenter(results[0].geometry.location);
        }
      });

      google.maps.event.addListener(marker, "click", () => {
        const content = document.createElement("div");
        const nameElement = document.createElement("h2");

        nameElement.textContent = place.name;
        content.appendChild(nameElement);

        const placeIdElement = document.createElement("p");

        placeIdElement.textContent = place.place_id;
        content.appendChild(placeIdElement);

        const placeAddressElement = document.createElement("p");

        placeAddressElement.textContent = place.formatted_address;
        content.appendChild(placeAddressElement);
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    },
  },
}
</script>
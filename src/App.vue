<template>
  <!-- <div class="absolute inset-0  bg-repeat  ">
  </div> -->
  <div class="relative flex min-h-screen flex-col justify-center bg-center bg-fixed py-6 sm:py-12" :style="{
    backgroundImage: 'url(' + bg + ')'
  }">
    <div
      class="relative backdrop-blur-md bg-amber-50/90 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5  sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div class="mx-auto max-w-xl">
        <div
          class="font-extrabold font-sans text-2xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow">
          炸雞獵人の小工具
        </div>
        <striped-card />
      </div>
    </div>
  </div>

</template>

<script>
import Bg from './assets/img/bg-fryg-blur.jpg'
import StripedCard from './components/StripedCard.vue';

export default {
  data() { return { bg: Bg } },
  components: {
    'striped-card': StripedCard,
  },
};
</script>
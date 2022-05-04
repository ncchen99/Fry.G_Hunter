<template>
  <!-- <div class="absolute inset-0  bg-repeat  ">
  </div> -->
  <div class="relative flex min-h-screen flex-col justify-center bg-center bg-fixed py-6 sm:py-12"
    style="background-image: url('./src/assets/img/bg.jpg')">
    <div
      class="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div class="mx-auto max-w-md">
        <div
          class="font-extrabold font-sans text-4xl text-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-md">
          貼文產生器
        </div>
        <striped-card />
      </div>
    </div>
  </div>

</template>

<script>
import StripedCard from './components/StripedCard.vue';

export default {
  components: {
    'striped-card': StripedCard,
  },
};
</script>
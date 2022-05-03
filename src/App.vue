<template>
  <div class="absolute inset-0 bg-center blur-sm" style="background-image: url('./src/assets/img/bg.jpg')"></div>
  <div class="relative flex min-h-screen flex-col justify-center overflow-y bg-transparent py-6 sm:py-12">
    <div
      class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div class="mx-auto max-w-md">
        <div
          class="font-extrabold font-sans text-4xl text-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-md">
          貼文產生器
        </div>

        <div class="divide-y divide-gray-300/50">
          <div class="space-y-6 py-4 text-base leading-7 text-gray-600">
            <ul class="space-y-4">
              <li class="flex items-center">
                <div class="mt-1 relative rounded-md w-full shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg> </span>
                  </div>
                  <input type="text" name="search" id="search"
                    class="focus:ring-amber-400 focus:border-amber-400 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="大頭鹽酥雞" />
                </div>
              </li>
              <li class="flex items-center">
                <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="11" />
                  <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                </svg>
                <p class="ml-4">
                  Extracting classes with
                  <code class="text-sm font-bold text-gray-900">@apply</code>
                </p>
              </li>
              <li class="flex items-center">
                <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="11" />
                  <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                </svg>
                <p class="ml-4">Code completion with instant preview</p>
              </li>
            </ul>
            <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share
              online.
            </p>
          </div>
          <div class="pt-8 text-base font-semibold leading-7">
            <p class="text-gray-900">Want to dig deeper into Tailwind?</p>
            <p>
              <a href="https://tailwindcss.com/docs" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
</script>
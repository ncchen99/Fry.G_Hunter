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
            <input type="text" name="search" id="search"
              class="focus:ring-amber-400 focus:border-amber-400 bg-amber-50 focus:bg-amber-100 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-lg"
              placeholder="大頭鹽酥雞" />
          </div>
          <div class="flex-initial">
            <button href="#"
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
    <div class="pt-4 leading-7">
      <div class="bg-amber-50 overflow-hidden sm:rounded-lg">
        <div class="px-4 py-4 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-amber-600"> 噗噗 {{ placeName }} </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-600">Personal details and application.</p>
        </div>
        <div>
          <dl>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">Full name</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">Margot Foster</dd>
            </div>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-amber-600">Application for</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">Backend Developer</dd>
            </div>
            <div class="bg-amber-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-lg">
              <dt class="text-sm font-medium text-amber-600">About</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">Fugiat ipsum ipsum deserunt
                culpa aute
                sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat
                sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur
                mollit
                ad adipisicing reprehenderit deserunt qui eu.</dd>
            </div>
            <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-amber-600">Attachments</dt>
              <dd class="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div class="w-0 flex-1 flex items-center">
                      <PaperClipIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span class="ml-2 flex-1 w-0 truncate"> resume_back_end_developer.pdf
                      </span>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Download </a>
                    </div>
                  </li>
                  <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div class="w-0 flex-1 flex items-center">
                      <PaperClipIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span class="ml-2 flex-1 w-0 truncate"> coverletter_back_end_developer.pdf
                      </span>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Download </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PaperClipIcon } from '@heroicons/vue/solid'

export default {
  components: {
    PaperClipIcon,
  },
}
</script>
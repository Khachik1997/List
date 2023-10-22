<template>
  <div id="dropdown" class="dropdown relative" ref="dropdown">
    <div ref="myDropdown" :class="{'show':isOpen}" class="flex gap-8 items-center">
      <ArrowRight :class="{'rotate-90': isOpen}" @click="toggleDropdown" class="cursor-pointer"/>
      <slot name="trigger"></slot>
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="isOpen">
        <div class="ml-52 mt-2">
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, computed, watch} from 'vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';


const props = defineProps({
  buttonText: String,
  closeOnInsideClick: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['isOpen']);
const dropdown = ref(null);
const isOpen = ref(false);

watch(isOpen, () => {
  emits('isOpen', isOpen.value);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};


</script>

<style>

</style>
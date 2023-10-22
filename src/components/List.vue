<template>
  <div class="list-container">
    <Dropdown @isOpen="toggleDropdown">
      <template #trigger>
        <div class="flex gap-8 items-center">
          <input v-model="list.marked"
                 :id="'checkbox-for-list' + list.id"
                 type="checkbox"
                 @change="markList(list)">
          <label :for="'checkbox-for-list' + list.id">
            <Component v-if="show !== 'Empty'" :is="mapTypeComponents[show]" />
          </label>
          {{ list.name }}
        </div>
      </template>
      <template #content>
        <div class="items">
          <div v-for="item in list.items" class="item">
            <Item :item="item" :list-id="list.id" />
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup>
import Dropdown from '@/components/Dropdown.vue';
import {defineAsyncComponent} from 'vue';
import Item from '@/components/Item.vue';
import {changeListIsExpand, markList} from '@/modules/list';
import {computed} from 'vue';

const mapTypeComponents = {
  CheckMark: defineAsyncComponent(() => import('@/components/icons/CheckMark.vue')),
  Dot: defineAsyncComponent(() => import('@/components/icons/Dot.vue')),
};

const props = defineProps(['list']);

const show = computed(() => {
  const checkedItemsLength = props.list.items.filter(item => item.checked === true).length;
  if (checkedItemsLength === props.list.items.length) {
    return 'CheckMark';
  } else if (props.list.items.some(item => item.checked)) {
    return 'Dot';
  } else {
    return 'Empty';
  }
});

const toggleDropdown = (value) => {
  changeListIsExpand(value, props.list.id);
};

</script>

<style scoped>


</style>
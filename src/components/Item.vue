<template>
  <div class="item-container user-none-select">
    <div class="flex gap-8 items-center">
      <input v-model="itemState.item.checked"
             :id="'checkbox-for-item' + itemState.item.id"
             type="checkbox"
             @change="changeItem(itemState.item, listId)">
      <label :for="'checkbox-for-item' + itemState.item.id">
        <CheckMark v-if="itemState.item.checked" class="font-black" />
      </label>
      {{ itemState.item.name }}
    </div>
    <div class="flex gap-12 items-center">
      <div class="number">
        <div v-if="!itemState.editingNumber" class="cursor-menu" @click="editNumber">
          {{ itemState.item.value }}
        </div>
        <input v-else v-model="itemState.item.value"
               class="cursor-menu"
               type="number"
               min="0"
               @blur="saveNumber"
               @keyup.enter="saveNumber">
      </div>
      <div class="color flex items-center">
        <input type="color" v-model="itemState.item.color" @change="changeColor" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import {changeItem} from '@/modules/list';
import CheckMark from '@/components/icons/CheckMark.vue';

const props = defineProps(['item', 'listId']);
const itemState = reactive({
  item: props.item,
  editingNumber: false,
  showColorPicker: false
});

const editNumber = () => {
  itemState.editingNumber = true;
};

const saveNumber = () => {
  if (itemState.item.value < 0 || isNaN(itemState.item.value) || !itemState.item.value) {
    itemState.item.value = 0;
  }
  
  changeItem(itemState.item, props.listId);
  itemState.editingNumber = false;
};

const changeColor = () => {
  changeItem(itemState.item, props.listId);
};

</script>

<style scoped>
.item-container {
  display: flex;
  justify-content: space-between;
}
</style>
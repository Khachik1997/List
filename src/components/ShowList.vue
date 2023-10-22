<template>
  <div class="list-container">
    <div v-if="list.isExpand" class="flex flex-col">
      <div class="flex justify-between items-center">
        <span>{{ list.name }}</span>
        <button @click="makeRandomItems">{{ buttonText }}</button>
      </div>
      
      <div v-if="isItemsRandom" class="flex gap-2 flex-wrap mt-8">
        <div v-for="(square, index) in randomItems"
             class="square"
             :key="index"
             :style="`background-color: ${square.item.color}`"
             @click="removeElementFromRandomSort(square.item, index)">
        </div>
      </div>
      <div v-else>
        <div v-for="(item, itemIndex) in list.items" :key="itemIndex">
          <div v-if="item.checked" class="flex gap-2 flex-wrap" :class="{'mt-8': item.value}">
            <div v-for="(square, index) in item.value"
                 class="square"
                 :key="index"
                 :style="`background-color: ${item.color}`"
                 @click="removeItemSquare(item, list.id)">
            </div>
          </div>
        </div>
      </div>
    
    </div>
    <div v-else>
      <span>{{ list.name }}</span>
    </div>
  </div>
</template>

<script setup>
import {changeListIsExpand, markList, removeItemSquare} from '@/modules/list';
import {computed, onMounted, ref} from 'vue';

const props = defineProps(['list']);
const isItemsRandom = ref(false);
const randomItems = ref([]);

const buttonText = computed(() => {
  
  if (isItemsRandom.value) {
    return 'сортировать';
  } else {
    return 'перемешать';
  }
});

const makeRandomItems = () => {
  isItemsRandom.value = !isItemsRandom.value;
  let squares = [];
  props.list.items.forEach(item => {
    for (let i = 0; i < item.value; i++) {
      squares.push({ item: item });
    }
  });
  
  for (let i = squares?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [squares[i], squares[j]] = [squares[j], squares[i]];
  }
  randomItems.value = squares;
};

const removeElementFromRandomSort = (item, index) => {
  removeItemSquare(item, props.list.id);
  randomItems.value.splice(index, 1);
};

</script>

<style scoped>
.list-container {
  border: 1px solid black;
  padding: 8px;
}

.square {
  width: 10px;
  height: 10px;
}
</style>
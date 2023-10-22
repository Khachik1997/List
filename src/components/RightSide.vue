<template>
  <div class="right-side">
    <div class="lists">
      <div v-for="list in lists"
           :key="list.id"
           class="list">
        <ShowList :list="list" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useListState from '@/modules/list';
import ShowList from '@/components/ShowList.vue';

const { lists } = useListState();

</script>

<style scoped>
.right-side {
  padding: 20px;
  border: 1px solid black;
  min-height: 600px;
  width: 500px;
}

.lists {
  display: flex;
  gap: 4px;
  flex-direction: column;
}
</style>
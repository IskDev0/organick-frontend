<script setup lang="ts">
import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight} from 'lucide-vue-next'
import {Button} from '@/components/ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select'
import handlePagination from "~/utils/handlePagination";

const {productsPaginationInfo} = storeToRefs(useProductsStore())
const {getProducts} = useProductsStore()

async function handleLimitChange() {
  productsPaginationInfo.value.currentPage = 1
  await getProducts()
}
</script>

<template>
  <div class="flex items-center justify-between my-2 py-4 px-4">
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select v-model="productsPaginationInfo.limit"
                :default-value="'10'"
                @update:modelValue="handleLimitChange">
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [5, 10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ productsPaginationInfo.currentPage }} of {{ productsPaginationInfo.totalPages }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
            variant="outline"
            class="hidden w-8 h-8 p-0 lg:flex"
            :disabled="productsPaginationInfo.currentPage === 1"
            @click="handlePagination('specific', getProducts, productsPaginationInfo, 1)"
        >
          <span class="sr-only">Go to first page</span>
          <ChevronsLeft class="w-4 h-4"/>
        </Button>
        <Button
            variant="outline"
            class="w-8 h-8 p-0"
            :disabled="productsPaginationInfo.currentPage === 1"
            @click="handlePagination('prev', getProducts, productsPaginationInfo)"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="w-4 h-4"/>
        </Button>
        <Button
            variant="outline"
            class="w-8 h-8 p-0"
            :disabled="productsPaginationInfo.currentPage === productsPaginationInfo.totalPages"
            @click="handlePagination('next', getProducts, productsPaginationInfo)"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="w-4 h-4"/>
        </Button>
        <Button
            variant="outline"
            class="hidden w-8 h-8 p-0 lg:flex"
            :disabled="productsPaginationInfo.currentPage === productsPaginationInfo.totalPages"
            @click="handlePagination('specific', getProducts, productsPaginationInfo, productsPaginationInfo.totalPages)"
        >
          <span class="sr-only">Go to last page</span>
          <ChevronsRight class="w-4 h-4"/>
        </Button>
      </div>
    </div>
  </div>
</template>
<template>
    <div>
        <div class="input-group mb-3">
            <input v-model="element" type="text" class="w-25" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button" @click="addList"><i class="material-icons">search</i></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>



<template>
  <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
    <q-list padding >
        <q-item clickable v-ripple>
            <q-item-section avatar class="icon">
            <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
            Inbox
            </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
            <q-item-section avatar>
                <q-icon name="star" />
            </q-item-section>

            <q-item-section>
            Star
            </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
            <q-item-section avatar>
            <q-icon name="send" />
            </q-item-section>

            <q-item-section>
            Send
            </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
            <q-item-section avatar>
            <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>
            Drafts
            </q-item-section>
        </q-item>
    </q-list>
    </q-scroll-area>

    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
        </div>
    </q-img>
</template>

<script>
export default {

}
</script>

<style>

</style>
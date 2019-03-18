<template>
    <div id="layout">
        <v-app id="inspire" dark>
            <v-navigation-drawer
            clipped
            fixed
            app
            >
                <v-list dense>
                    <v-list-tile @click="home">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Home</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="lists">
                        <v-list-tile-action>
                            <v-icon>list_alt</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Lists</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="about">
                        <v-list-tile-action>
                            <v-icon>info</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>About</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-content style="padding: 0px 0px 0px 150px;">
                <router-view></router-view>
            </v-content>
        </v-app>
    </div>


</template>

<script>

export default {
    name: 'NavBar',
    data: () =>({
    }),
    methods: {
        home: function() {
            this.$router.push('/')
        },
        lists: function() {
            this.$router.push('/lists')
        },
        about: function () {
            this.$router.push('/about')
        }
    }
}
</script>

<style>
</style>

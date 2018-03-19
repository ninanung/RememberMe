<template>
    <div class="body">
        <login v-if="Login"></login>
        <signin v-if="Signin"></signin>
        <div class="title">
            <h1 id="title">RememberMe</h1>
            <div class="span">
                <span v-if="islogin"><button class="btn btn-default" @click="logout()">Logout</button></span>
                <template v-else>
                    <span><button class="btn btn-default" @click="loginPage()">Login</button></span>
                    <span><button class="btn btn-default" @click="signinPage()">Signin</button></span>
                </template>
                <br/>
                <span v-if="islogin">Hello, {{ user.id }}</span>
                <span v-else>Please Login!</span>
            </div>
        </div>
    </div> 
</template>

<script>
import { mapState } from 'vuex'
import constant from './constant.js';
import Login from './components/Login.vue';
import Signin from './components/Signin.vue';

export default {
    name: 'app',
    computed: mapState([ 'Login', 'Signin' ]),
    components: { Signin, Login },
    data: function() {
        return {
            islogin: "",
            user: {
                id: "",
                email: ""
            }
        }
    },
    mounted: function() {
        let islogin;
        chrome.storage.sync.get(["islogin"], function(result) {
            islogin = result.islogin;
        });
        if(islogin) {
            this.islogin = islogin;
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch(constant.LOGOUT);
            window.location.reload(false);
        },
        loginPage: function() {
            this.$store.dispatch(constant.LOGINPOPUP);
        },
        signinPage: function() {
            this.$store.dispatch(constant.SIGNINPOPUP);
        }
    }
}
</script>

<style>
    @import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
    #title {
        text-align: center;
        font-size: 50px; margin-left: 20px; margin-bottom: 20px;
        font-weight: bold; color: #997053; text-decoration: none;
    }
    .body {
        width: 400px; height: 500px; margin: 0 auto;
    }
    .title {
        background: white; padding: 10px 0 0 0; color: EE6767;
        font-size: 20px; height: 150px;
    }
    .btn {
        color: #997053; font-weight: bold;
    }
    .btn:hover {
        background: #997053; color: white;
    }
    .span {
        float: right; margin-right: 10px;
    }
</style>

<template>
    <div class="modal">
        <div @keyup.esc="cancel" @keyup.enter="login" class="form">
            <h1 class="inputhead">Login</h1>
            <hr>
            <div class="input">
                <label>ID</label>
                <input class="id" type="text" v-model="id" placeholder="ID" autofocus />
            </div>
            <div class="input">
                <label>Password</label>
                <input class="password" type="password" v-model="password" placeholder="Password" /> 
            </div>
            <h3>{{ word }}</h3>
            <div class="input">
                <button @click="login()">Login</button>
                <button @click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import constant from '../constant.js';
import contactapi from '../contactapi.js';

export default {
    name: "login",
    data: function() {
        return {
            id: "",
            password: "",
            word: ""
        }
    },
    methods: {
        login: function() {
            let words = "";
            let error;
            contactapi.login(this.id, this.password)
            .then((res) => {
                error = res.data.error;
                words = res.data.words;
                if(error === "false") {
                    this.$store.dispatch(constant.LOGIN, { id: this.id, islogin: "true" });
                    this.id = "";
                    this.password = "";
                    return this.$store.dispatch(constant.LOGINCANCEL);
                }
                else {
                    return this.word = res.data.words;
                }
            });
        },
        cancel: function() {
            this.$store.dispatch(constant.LOGINCANCEL);
        }
    }
}
</script>

<style scoped>
    .modal {
        display: block; position: fixed; width: 100%; height: 100%;
        left: 0; top: 0; overflow: auto; z-index: 1;
        background: rgb(0, 0, 0); background: rgba(0, 0, 0, 0.4);
    }
    .form {
        background-color: white; margin: 100px auto;
        font: 13px "verdana"; padding: 10px 10px 10px 10px;
        width: 300px;
    }
    button {
        width: 100px; height: 40px; background: white;
        border: white; color: #997053; font-size: 20px;
        font-weight: bold;
    }
    button:hover {
        background: #997053; color: white;
    }
    .form label {
        text-align: left; margin: 5px; padding: 5px;
        display: block;
        display: black; font-weight: bold;
    }
    .form input {
        box-sizing: border-box; outline: none; padding: 5px;
        display: block; margin: 5px;
    }
    .inputhead {
        color: #997053; font-weight: bold;
        width: 300px; height: 40px; text-align: left;
    }
</style>

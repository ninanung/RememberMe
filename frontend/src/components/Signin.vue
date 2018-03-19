<template>
    <div class="modal">
        <div @keyup.esc="cancel" @keyup.enter="signin()" class="form">
            <h1 class="inputhead">Signin</h1>
            <hr>
            <div class="input">
                <label>ID</label>
                <input type="text" v-model="id" placeholder="ID" autofocus />
            </div>
            <div class="input">
                <label>Password</label>
                <input type="password" v-model="password" placeholder="Password" /> 
            </div>
            <div class="input">
                <label>Repeat Password</label>
                <input type="password" v-model="repeatPassword" placeholder="Repeat Password" /> 
            </div>
            <div class="input">
                <label>Email</label>
                <input type="email" v-model="email" placeholder="Email" />
            </div>
            <div class="input">
                <label>Repeat Email</label>
                <input type="email" v-model="repeatEmail" placeholder="Repeat Email" />
            </div>
            <h3>{{ word }}</h3>
            <div class="input">
                <button @click="signin()">Signin</button>
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
            repeatPassword: "",
            email: "",
            repeatEmail: "",
            word: "",
            isWrong: false
        }
    },
    watch: {
        id: function() {
            if(this.id.length > 10) {
                this.word = "ID는 10자 이하입니다.";
            }
        }
    },
    methods: {
        signin: function() {
            if(this.id.length < 3) {
                return this.word = "ID는 3자 이상입니다."
            }
            else if(!this.id || !this.password || !this.email || !this.repeatEmail || !this.repeatPassword) {
                return this.word = "모든 정보를 채워주세요."
            }
            else if(this.password !== this.repeatPassword) {
                return this.word = "비밀번호를 일치시켜주세요."
            }
            else if(this.email !== this.repeatEmail) {
                return this.word = "Email을 일치시켜주세요."
            }
            else {
                let words = "";
                let error;
                contactapi.signin(this.id, this.password, this.email)
                .then((res) => {
                    words = res.data.words;
                    error = res.data.error;
                    if(res.data.error == "true") {
                        return this.word = res.data.words;
                    }
                    else {
                        console.log(res.data);
                    }
                    if(error == "false") {
                        this.id = "";
                        this.password = "";
                        this.email = "";
                        return this.$store.dispatch(constant.SIGNINCANCEL);
                    }
                    else {
                        return this.word = res.data.words;
                    }
                });
            }
        },
        cancel: function() {
            this.$store.dispatch(constant.SIGNINCANCEL);
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

<template>
  <q-page
    class="window-height window-width row justify-center items-center auth-bg"
    @mousemove="cursorAnim"
    :style="{ 'background-position': backgroundPos }"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card class="shadow-24 radial-grad">
          <q-card-section class="bg-light-blue-10">
            <h5 class="text-h6 text-white q-my-xs"> Admin {{ vstore }} </h5>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input 
                square 
                clearable 
                v-model="login.email" 
                type="email" 
                label="Email"
                error-message="Enter correct email"
                :error="!isValidEmail"
                @keydown.enter="validateInputsFunc()"
                >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input 
                square 
                clearable 
                v-model="login.password" 
                type="password" 
                label="Password"
                error-message="Must be more than 5 characters, contains number & special character"
                :error="!isValidPassword"
                @keydown.enter="validateInputsFunc()"
                >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn 
              unelevated 
              size="md" 
              color="light-blue-6" 
              class="full-width text-white" 
              label="Sign In" 
            @click="validateInputsFunc()" 
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',

  components: {
  },
  
  setup() {

    const $store = useStore()
    const $router = useRouter()
    
    const login = reactive({
      email: '',
      username: '',
      password: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      pwregdigit: /[0-9]+/, 
      pwregspec: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    })

    const isValidEmail = ref(true)
    const isValidPassword = ref(true)

    const cursor = reactive({
      x: 0,
      y: 0
    })

    const validateInputsFunc = () => {
      if(login.reg.test(login.email)) {
        isValidEmail.value = true
      } else {
        isValidEmail.value = false
      }

      if(login.password && login.password.length < 5 || !login.pwregdigit.test(login.password) || !login.pwregspec.test(login.password)) {
        isValidPassword.value = false
      } else {
        isValidPassword.value = true
      }
      
      if(isValidEmail.value == false || isValidPassword.value == false) {
        increase()
      } else {
        $router.push('/')
      }
    }

    const increase = (() => { $store.commit('module/increment', 1) })
    const cursorAnim = ( (e) => { cursor.x = (e.pageX * -1 / 50) }) // x-axis
    const vstore = computed(() => $store.getters['module/authLogInCount'])

    const backgroundPos = computed( () => {
      return cursor.x + 'px ' + 0 + 'px'
    })
    
    return { 
      cursorAnim, //css
      backgroundPos, //css
      login, //validation
      isValidEmail, //validation
      isValidPassword, //validation
      validateInputsFunc, //validation
      vstore, //state mgmt
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 326px) {
  .auth-bg {
    background-position: unset;
  }
}
.radial-grad {
  background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
  height: 450px;
  width: 300px;
}
.auth-bg {
  background-size: 110% 110%;
  background-repeat: no-repeat;
  background-image: url('assets/images/wallpaper-mountains.jpg');
  background-position: center center;
  padding: 0;
  margin: 0;
  height: 100%; 
  overflow: hidden;
}
.column.q-pa-lg {
  opacity: 0.9;
}

</style>
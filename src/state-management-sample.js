import { useStore } from 'src/store'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup (props, opts) {
    const store = useStore()
    
    // mapping state
    const field = computed(() => store.state.module.field)
    
    // mapping mutation
    function setField (val) {
      store.commit('module/setField', val)
    }

    // mapping state and mutation (required to dual bind)
    const other = computed({
      get () { return store.state.module.other },
      set (val) { return store.commit('module/setOther', val) }
    })

    // mapping getter
    const calculated = computed(() => store.getters['module/calculated'])

    // mapping getters and mutation (required to dual bind)
    const otherCalculated = computed({
      get () { return store.getters['module/otherCalculated'] },
      set (val) { return store.commit('module/setOtherCalculated', val) }
    })
    
    // if u're going to use actions, don't forget to mark the function as action, and await any dispatch what u would do
    // mapping actions
    async function setField (val) {
      await store.dispatch('module/doSomething', val)
    }

    return {
      field,
      setField,
      other,
      calculated,
      otherCalculated,
      setField
    }
  }
})
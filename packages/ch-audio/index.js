import chAudio from './src/chen-audio'

chAudio.install=Vue=>{
    Vue.component(chAudio.name, chAudio)
}

export default chAudio
<template>
        <v-flex xs3>
            <v-card
            hover
            class="font-weight-bold"   
            :class="[cs.clock,state]" 
            @click="changeStatus()">
                {{time}} <span>{{state}}</span>
            </v-card>
        </v-flex>
</template>

<script>

    export default {
        data(){
            return{
                time: '',
                state: '',
                cs:{
                    clock:"oclock",
                }
            }
        },
        created(){
          this.updateTime();
          setInterval(this.updateTime,1000);
        //   console.log(this.$data.time);
        },
        mounted(){
            // console.log(this.$el.style);
        },
        methods:{
            changeStatus(){
                let st = this.dayStatus();
                if(st === 'PM') {
                    this.state = "AM";
                    return;
                }
                this.state = 'PM'
            },
            dayStatus(){
                let at=this.time.split(':'),
                hr = parseInt(at[0]);
                return hr >= 12 ?'PM':'AM';
            },
            updateTime(){
                var cd = new Date();
                this.time = this.zeroPadding(cd.getHours(), 2)
                + ':' + this.zeroPadding(cd.getMinutes(), 2)
                + ':' + this.zeroPadding(cd.getSeconds(), 2);
            },
            zeroPadding (num, digit) {
                var zero = '';
                for(var i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            }
        },
        watch:{
            time(){
                let st = this.dayStatus();
                this.state = st;
            }
        },
        //local directives
        directives: {
            fcolor: {
                // directive definition
                bind(el,binding) {
                    el.style.color = binding.value;
                }
            }
        },
        filters: {
            smallize(value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toLowerCase() + value.slice(1)
            }
        }
    }
</script>

<style scoped>
    .oclock {
        height: 70px;
        margin-bottom: 10px;
        font-size: 23px;
        text-align: center;
        line-height: 70px;
        font-weight: bold;
        font-family: sans-serif;
        cursor: pointer;
    }
    span{
        font-size: 11px;
        margin-left: -4px
    }
    .PM{ color:#3f51b5 !important;}
    .AM{ color :#f44336!important}
</style>
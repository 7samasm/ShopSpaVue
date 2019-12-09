<template>

    <v-card :class="addBoardClass" raised>
        <v-layout row wrap>
            <v-flex sm2 xs12>
                <v-combobox
                    :color="color"
                    @change="changedType"
                    v-model="select"
                    value="m"
                    :items="items"></v-combobox>
            </v-flex>
            <v-flex sm6 xs12>
                <v-text-field :color="color" label="description" prependInnerIcon="message" v-model="description" ref="descriptionRef"></v-text-field>
            </v-flex>
            <v-flex sm2 xs12>
                <v-text-field :color="color" label="value" type="number" prependInnerIcon="folder" v-model="value"></v-text-field>
            </v-flex>
            <v-flex sm2 xs12>
                <v-btn fab depressed flat @click="addItem">
                    <v-icon class = 'add__icon' large :color="color">check_circle_outline</v-icon>                   
                </v-btn>
            </v-flex>
        </v-layout>
    </v-card>

</template>

<script>

    import DataItemsModel from './DataItemsModel'
    import DataItemsService from '../../DataItemsService'
    import {mapActions,mapGetters} from 'vuex'

    export default {
    	
        data()
        {
            return {
                type : "",
                description : "",
                value: "",
                select : '',
                items : ['+','-']
            }
        },
        computed : {
            ...mapGetters({
                addBoardClass : 'addBoardClass',
                color : 'color'
            })
        },      
        methods : 
        {
            // ...mapActions({
            //     addItem: 'addItem'
            // }),
            async addItem()
            {
                let intVal = parseInt(this.value)
                if (this.description !== "" && !isNaN(intVal) && intVal > 0)
                {
                    let newItem;
                    //create DataItems Model's object
                    newItem              = new DataItemsModel();
                    newItem._type        = this.type;
                    newItem._description = this.description;
                    newItem._value       = intVal;
                    try {
                        //insert an item row into data.json
                        await DataItemsService.insertItem(newItem);
                        //update data of store to update ui
                        this.$store.commit('dataItems',await DataItemsService.getTenRecordsForEachType())
                    } catch(e) {
                        console.log(e);
                    }
                    //clear fiels
                    this.description = '';
                    this.value = '';
                    // add cursor to description input
                    this.$refs.descriptionRef.focus();
                }
            },
            changedType(){
                if (this.select === '-') {

                    this.type = 'exp'
                    this.$store.dispatch('setAddBoardClass','red-add')
                    this.$store.dispatch('setColor','red')

                } else {
                    this.type = 'inc'
                    this.$store.dispatch('setAddBoardClass','add')
                    this.$store.dispatch('setColor','teal')
                }
            }
        },
        created()
        {
            document.addEventListener('keypress',event => {
                // check if you press enter
                if (event.keyCode === 13 || event.which === 13) {
                    this.addItem();
                }
            });
        }
    }
</script>

<style scoped>
.add {
    background-color: #e7f3ed73;
}
.red-add {
    background-color: #fff2f2c2;
}
.add , .red-add {
    padding: 20px;
    transition: border 0.3s;
    transition: background 0.3s
}

</style>
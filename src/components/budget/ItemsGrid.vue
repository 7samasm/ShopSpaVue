<template>
    <div>
        <v-layout row wrap>
            <v-flex md6 xs12>
                <div class="income">
                    <h2 class="icome__title">Income</h2>

                    <v-card  v-for="income in getItemsByType('inc')" :key="income._id" class="item__card item" hover>
                        <v-layout row wrap>
                            <v-flex left>{{income._description}}</v-flex>
                            <v-flex right>
                                <div class="right">
                                    <div class="item__value">{{income._value}}</div>
                                    <div class="item__delete">
                                        <button 
                                            class="item__delete--btn"
                                            @click="deleteItem(income._id)">
                                            <v-icon color="#28B9B5">delete</v-icon>
                                        </button>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card >
                                 
                </div>
            </v-flex>

            <v-flex md6 xs12>
                <div class="expenses">
                    <h2 class="expenses__title">Expenses</h2>

                    <v-card v-for="expense in getItemsByType('exp')" :key="expense._id" class="item__card item" hover>   
                        <v-layout row wrap>
                            <v-flex left>{{expense._description}}</v-flex>
                            <v-flex right>
                                <div class="right">
                                    <div class="item__value">- {{expense._value}}</div>
                                    <div 
                                    class="item__percentage" 
                                    v-if="expense._percentage > 0">{{expense._percentage}}%</div>
                                    <div 
                                    class="item__percentage" 
                                    v-else>---</div>
                                    <div class="item__delete">
                                        <button 
                                            class="item__delete--btn">
                                            <v-icon color="#FF5049" @click="deleteItem(expense._id)">delete</v-icon>
                                        </button>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>

                </div>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-pagination
                      v-model="page"
                      :length="allPdata.totalPages"></v-pagination>
              </div>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    import DataItemsService from '../../DataItemsService'
    import {budgetMixin} from './BudgetMixin'
    import {eventBus} from '../../main';

    export default {

        mixins  : [budgetMixin],
        data () {
            return {
                page: 1
            }
        },
        watch   :
        {
            page() {this.reset()},
            dataItems()
            {
                // calculate percentages
                let inc = this.totals['inc']
                if (inc > 0) 
                {
                    this.dataItems.forEach(cur => {
                        if(cur._type === 'exp') cur._percentage = Math.round((cur._value / inc) * 100);
                    })
                } 
                else 
                {
                    this.dataItems.forEach(cur => {
                        cur._percentage = -1
                    });
                }  
            }
        },
        methods :
        {
            async deleteItem(id)
            {
                try {
                    //delete an item row into data.json
                    await DataItemsService.removeItem(id);
                    //update dataItem properity to update ui
                    this.$store.commit('dataItems',await DataItemsService.getTenRecordsForEachType())
                } catch(e) {
                    // statements
                    console.log(e);
                }
            },
            async reset()
            {
                console.log(this.page)
                let dataItems,arr = [],obj = {}
                try {
                    arr = await DataItemsService.getRecordsForEachType(this.page)
                    dataItems = [...arr.incs,...arr.exps]
                    obj = {
                        recordsNum : arr.total['inc'],
                        currPage   : arr.page['inc'],
                        totalPages : arr.pages['inc'],
                        hasNext    : arr.hasNextPage['inc'],
                        hasPrev    : arr.hasPrevPage['inc']
                    }
                } catch(e) {
                    console.log(e);
                }
                console.table(dataItems)
                this.$store.commit('allPdata',obj)
                this.$store.commit('dataItems',dataItems)
            }
        },
        created()
        {
            this.reset()
        }
    }
</script>

<style scoped>

.income , .expenses {
    padding: 15px
}
h2 {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 15px;
}
.item__card {margin-bottom: 8px}
.icome__title { color: #28B9B5; }
.expenses__title { color: #FF5049; }

.item {
    padding: 11px;
}
/*.item:nth-child(even) { background-color: #f7f7f7; }*/

.item__value {
    float: left;
    transition: transform 0.3s;
}

.item__percentage {
    float: left;
    margin-left: 15px;
    transition: transform 0.3s;
    font-size: 11px;
    background-color: #FFDAD9;
    padding: 2px;
    width: 35px;
    text-align: center;
}

.income .item__value,
.income .item__delete--btn {
    color: #28B9B5;
}

.expenses .item__value,
.expenses .item__percentage,
.expenses .item__delete--btn {
    color: #FF5049;
}


.item__delete {
    float: left;
}

.item__delete--btn {
    font-size: 22px;
    background: none;
    border: none;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    display: none;
}

.item__delete--btn:focus { outline: none; }
.item__delete--btn:active { transform: translateY(2px); }

.item:hover .item__delete--btn { display: block; }
.item:hover .item__value { transform: translateX(-20px); }
.item:hover .item__percentage { transform: translateX(-20px); }


.unpaid {
    background-color: #FFDAD9 !important;
    cursor: pointer;
    color: #FF5049;

}

.unpaid .item__percentage { box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1); }
.unpaid:hover .item__description { font-weight: 900; }
</style>
<template>
    <div class="top">
        <div class="budget">
            <div class="budget__title">
                Available Budget in <span class="budget__title--month">{{displayDate()}}</span>
            </div>
            
            <div class="budget__value"><span v-if="budget >= 0">+</span>{{budget}}</div>
            
            <div class="budget__income clearfix">
                <div class="budget__income--text">Income</div>
                <div class="right">
                    <div class="budget__income--value">+ {{totals.inc}}</div>
                    <div class="budget__income--percentage">&nbsp;</div>
                </div>
            </div>
            
            <div class="budget__expenses clearfix">
                <div class="budget__expenses--text">Expenses</div>
                <div class="right clearfix">
                    <div class="budget__expenses--value">- {{totals.exp}}</div>
                    <div class="budget__expenses--percentage" v-if="percentage >= 0">{{percentage}}%</div>
                    <div class="budget__expenses--percentage" v-else >---</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {budgetMixin} from './BudgetMixin'
    import {eventBus} from '../../main';
    export default
    {
        mixins : [budgetMixin],
        data()
        {
            return {
                budget : 0,
                percentage : -1
            }
        },
        watch : 
        {
            //when dataItems properity change
            dataItems()
            {
                // recalculate totals incs & exps
                this.calculateTotal('inc')
                this.calculateTotal('exp')
                // Calculate the budget: income - expenses
                this.budget = this.totals.inc - this.totals.exp;
                // calculate the percentage of income that we spent
                if (this.totals.inc > 0) {
                    this.percentage = Math.round((this.totals.exp / this.totals.inc) * 100);
                } else {
                    this.percentage = -1;
                } 
            }
        },
        methods:
        {
            calcBudget()
            {
                return this.totals.inc - this.totals.exp
            },
            displayDate()
            {
                let now, months, month, year;
                
                now = new Date();
                months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                month = now.getMonth();
                year = now.getFullYear();
                return months[month] + ' ' + year
            }
        },
        created()
        {
            console.log('header created')
            eventBus.$on('addDataItem',d => {
                this.dataItems = d;
            });
            eventBus.$on('deleteDataItem',d => {
                this.dataItems = d;
            });          
        }
    }
</script>

<style scoped>
.right { float: right; }
.red { color: #FF5049 !important; }
.red-focus:focus { border: 1px solid #FF5049 !important; }
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
.top {
    height: 40vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(../../assets/back.png);
    background-size: cover;
    background-position: center;
    position: relative;
    margin-bottom: 20px
}

.budget {
    position: absolute;
    width: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
}

.budget__title {
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
    font-weight: 300;
}

.budget__value {
    font-weight: 300;
    font-size: 46px;
    text-align: center;
    margin-bottom: 25px;
    letter-spacing: 2px;
}

.budget__income,
.budget__expenses {
    padding: 12px;
    text-transform: uppercase;
}

.budget__income {
    margin-bottom: 10px;
    background-color: #28B9B5;
}

.budget__expenses {
    background-color: #ff7a79;
}

.budget__income--text, .budget__expenses--text {
    float: left;
    font-size: 14px;
    color: #fff;
    margin-top: 2px;
    font-weight: bold;
}

.budget__income--value,
.budget__expenses--value {
    letter-spacing: 1px;
    float: left;
}

.budget__income--percentage,
.budget__expenses--percentage {
    float: left;
    width: 34px;
    font-size: 11px;
    padding: 3px 0;
    margin-left: 10px;
}

.budget__expenses--percentage {
    background-color: rgba(255, 255, 255, 0.2);
    text-align: center;
    border-radius: 3px;
}
</style>
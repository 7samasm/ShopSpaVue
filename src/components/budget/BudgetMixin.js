import {mapGetters,mapActions} from 'vuex'

/*
cd ~/budgetApi
*/
export const budgetMixin = {
    computed :
    {
        ...mapGetters({
            dataItems  : 'dataItems',
            totals     : 'totals',
            budget     : 'budget',
            percentage : 'percentage',
            allPdata : 'allPdata'
        })
    },
    watch : 
    {
        dataItems()
        {
            console.log('%c watch called from mixin','color:teal;font-weight:bold')
            // calculate totals incs & exps
            this.calculateTotal('inc')
            this.calculateTotal('exp')        
        }
    },
	methods : 
	{
        ...mapActions({
            calculateTotal: 'calculateTotal'
        }),
        getItemsByType(type)
        {
            return this.dataItems.filter(dataItems => dataItems._type === type)
        }
	},
    created(){
        console.log('%c created hook called from mixin','color:orange;')
    }
}


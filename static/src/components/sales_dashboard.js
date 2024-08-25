/** @odoo-module */

import { registry } from "@web/core/registry"
import { KpiCard } from "./kpi_card/kpi_card"
import { ChartRenderer } from "./chart_renderer/chart_renderer"
import { loadJS } from "@web/core/assets"
import { useService } from "@web/core/utils/hooks"
const { Component, onWillStart, useRef, onMounted,useState } = owl

export class OwlSalesDashboard extends Component {
    setup(){
        this.state = useState({
            agriculteurs: {
                value:10,
                percentage:6,
            },
            champs: {
                value:10,
                percentage:6,
            },
            period:30,
        })

        this.orm = useService("orm")

        onWillStart(async ()=>{
            this.getDates()
            await this.getAgriculteurs()
            await this.getChamps()
        })

        this.actionService = useService("action")
    }

    async onChangePeriod(){
        this.getDates()
        await this.getAgriculteurs()
        await this.getChamps()
    }

    getDates(){
        this.state.current_date = moment().subtract(this.state.period, 'days').format('L')
        this.state.previous_date = moment().subtract(this.state.period * 2, 'days').format('L')
    }

    async getAgriculteurs(){
        let domain = []
        if (this.state.period > 0){
            domain.push(['create_date','>', this.state.current_date])
        }
        const data = await this.orm.searchCount("cocca.agri", domain)
        this.state.agriculteurs.value = data

        // previous period
        let prev_domain = []
        if (this.state.period > 0){
            prev_domain.push(['create_date','>', this.state.previous_date], ['create_date','<=', this.state.current_date])
        }
        const prev_data = await this.orm.searchCount("cocca.agri", prev_domain)
        const percentage = ((data - prev_data)/prev_data) * 100
        this.state.agriculteurs.percentage = percentage.toFixed(2)
    }

    async getChamps(){
        let domain = []
        if (this.state.period > 0){
            domain.push(['create_date','>', this.state.current_date])
        }
        const data = await this.orm.searchCount("coca_champ", domain)
        this.state.champs.value = data

        // previous period
        let prev_domain = []
        if (this.state.period > 0){
            prev_domain.push(['create_date','>', this.state.previous_date], ['create_date','<=', this.state.current_date])
        }
        const prev_data = await this.orm.searchCount("coca_champ", prev_domain)
        const percentage = ((data - prev_data)/prev_data) * 100
        this.state.champs.percentage = percentage.toFixed(2)
    }

    // Datat view methods
    async viewAgriculteurs(){
        let domain = []
        if (this.state.period > 0){
            domain.push(['create_date','>', this.state.current_date])
        }

        // get the id of the list view
        let list_view = await this.orm.searchRead("ir.model.data", [['name', '=', 'view_cocca_agri_tree']], ['res_id'])

        this.actionService.doAction({
            type: "ir.actions.act_window",
            name: "Agriculteurs",
            res_model: "cocca.agri",
            domain,
            views: [
                [list_view.length > 0 ? list_view[0].res_id : false, "list"], // use list_view id or false
                [false, "form"],
            ]
        })
    }

    async viewChamps(){
        let domain = []
        if (this.state.period > 0){
            domain.push(['create_date','>', this.state.current_date])
        }

        // get the id of the list view
        let list_view = await this.orm.searchRead("ir.model.data", [['name', '=', 'view_coca_champ_tree']], ['res_id'])

        this.actionService.doAction({
            type: "ir.actions.act_window",
            name: "Champs",
            res_model: "coca_champ",
            domain,
            views: [
                [list_view.length > 0 ? list_view[0].res_id : false, "list"], // use list_view id or false
                [false, "form"],
            ]
        })
    }
    //...

}

OwlSalesDashboard.template = "owl.OwlSalesDashboard"
OwlSalesDashboard.components = { KpiCard, ChartRenderer }

registry.category("actions").add("owl.sales_dashboard", OwlSalesDashboard)
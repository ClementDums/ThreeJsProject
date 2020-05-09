import appStates from '../../Helpers/ExperienceStates';
import Filter from "./Filter";
import Hypersex from "./Hypersex";
import UIManager from "../UI/UIManager";
import RaycasterManager from "../Interaction/RaycasterManager";
import InteractionManager from "../Interaction/InteractionManager";

const ModuleManager = {
    init() {
        this.currentModule = null;
        this.filter = new Filter();
        this.hypersex = new Hypersex();
        this.modules = [];
        this.phone = null;
    },

    //Init Modules
    initFilter(phone, heart, statue0, statue1, statue2, statue3) {
        this.filter.init(phone, heart, statue0, statue1, statue2, statue3);
        this.modules.push(this.filter);
    },

    initHypersex(hiddenObjects, phone) {
        this.hypersex.init(hiddenObjects, phone);
        this.modules.push(this.hypersex);
    },

    setFilterLight(light) {
        this.filter.setLight(light);
    },
    setHypersexLight(light) {
        this.hypersex.setLight(light);
    },
    showPhone() {
        this.phone.show();
        this.phone.setCameraScreenTexture();
    },

    moduleClick(name) {
        this.currentModule.clickedModule(name);
    },

    /**
     * Animate each module
     */
    animateModule() {
        if (this.modules.length > 0) {
            this.modules.forEach((module) => {
                module.animate();
            })
        }

    },

    /**
     * Start new module
     * @param state
     */
    changeModule(state) {
        this.endModule();
        switch (state) {
            case appStates.FILTER :
                this.currentModule = this.filter;
                break;

            case appStates.HYPERSEX :
                this.currentModule = this.hypersex;
                break;
        }
        this.startModule()
    },

    /**
     * Start module : show phone icon and light, hide previous if first module
     */
    startModule() {
        setTimeout(() => {
            UIManager.phoneIconOn();
        }, 1000);
        this.currentModule.light.visible = true;
        const currentPos = this.modules.indexOf(this.currentModule);
        if (currentPos === 0) {
            UIManager.hidePrev();
        }
    },

    /**
     * Handle phone icon click
     */
    clickedPhoneIcon() {
        //Enable click on module
        this.currentModule.enableModuleClick();
        RaycasterManager.isActive = true;
        InteractionManager.clickListener = true;

        this.currentModule.isClickable = true;
        //Phone icon off
        UIManager.phoneIconOff();
        //Show virtual phone
        this.showPhone();
    },


    /**
     * Set module disable, reset module
     */
    endModule() {
        if (this.currentModule) {
            this.currentModule.isActive = false;
            this.currentModule.isClickable = false;
            this.currentModule.resetModule();

        }

        UIManager.deleteCarousel();
        UIManager.displayNextPrev();
    }


};

export default ModuleManager;

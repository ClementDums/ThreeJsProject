import appStates from '../../Helpers/ExperienceStates';
import Filter from "./Filter";
import Hypersex from "./Hypersex";
import UIManager from "../UI/UIManager";

const ModuleManager = {
    init() {
        this.currentModule = null;
        this.filter = new Filter();
        this.hypersex = new Hypersex();
        this.modules = [];
        this.phone = null;
        this.isOnPhone = false;
        this.isClickable = false;
        this.completedModules = 0;
        this.allModulesCompleted = false;
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
        if (this.isClickable) {
            this.currentModule.clickedModule(name);
            this.isClickable = false;
        }
    },

    /**
     * Indent completed modules
     */
    moduleCompleted() {
        let i = 0;
        this.modules.forEach((item) => {
            if (item.isCompleted) {
                i++;
            }
        });
        if (i >= this.modules.length) {
            this.allModulesCompleted = true;
        }
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
        this.isOnPhone = false;
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
        this.testPrevNextDisplay();
        setTimeout(() => {
            UIManager.phoneIconOn();
            UIManager.phoneTextOut();

        }, 1000);
        this.currentModule.light.visible = true;
    },

    /**
     * Handle phone icon click
     */
    clickedPhoneIcon() {
        //Hide text
        UIManager.hidePhoneText();
        //Phone icon off
        UIManager.phoneIconOff();
        //Show phone
        if (!this.isOnPhone) {
            UIManager.hideNextPrev();
            //Enable click on module
            this.currentModule.enableModuleClick();
            //Show virtual phone
            this.showPhone();
            this.isOnPhone = true;
            this.isClickable = true;

        } else {
            //If phone is out
            //Stop phone filtering
            this.currentModule.stopPhone();
            UIManager.displayNextPrev();
            this.isOnPhone = false;
            this.testPrevNextDisplay();
        }
    },

    /**
     * Test of prev and next button displaying
     */
    testPrevNextDisplay() {
        const currentPos = this.modules.indexOf(this.currentModule);
        if (currentPos === 0) {
            UIManager.hidePrev();
        }
        //TODO : Change to -1 when 3rd module is implemented
        if (!this.allModulesCompleted && currentPos >= this.modules.length) {
            UIManager.hideNext();
        }
    },

    /**
     * Set module disable, reset module
     */
    endModule() {
        if (this.currentModule) {
            this.currentModule.isActive = false;
            this.currentModule.resetModule();
            UIManager.deleteCarousel();
        }
        UIManager.displayNextPrev();
        this.moduleCompleted();
    }
};

export default ModuleManager;

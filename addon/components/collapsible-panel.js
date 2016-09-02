import Ember from 'ember';
import Layout from './collapsible-layout';

export default Ember.Component.extend({
  classNameBindings: [
    "isCollapsed:collapsed",
    "top:collapsible-panel--top",
    "right:collapsible-panel--right",
    "bottom:collapsible-panel--bottom",
    "left:collapsible-panel--left",
    "center:collapsible-panel--center",
    "resizeable:resizeable"
  ],
  classNames: "collapsible-panel-container",
  showCollpseBtn: true,
  hideCollpseBtn: Ember.computed('layout.hideCollpseBtn', 'showCollpseBtn', function() {
    return !(!this.get('layout.hideCollpseBtn') && this.get('showCollpseBtn'));
  }),
  region: 'center',
  resizeable: undefined,
  width: 100,
  height: 100,
  config: {},

  _config: Ember.computed('region', 'resizeable', 'width', 'height', function() {
    let region = this.get('region');
    let resizeable = this.get('resizeable');
    let width = this.get('width');
    let height = this.get('height');

    return { region, resizeable, width, height };
  }),


  actions: {
    collapsePanel(){
      this.get("layout").collapsePanel(this.get("region"));
    },
    expandPanel(){
      this.get("layout").expandPanel(this.get("region"));
    }
  },
  collapse() {
    this.set('isCollapsed', true);
    this.get('layout').set(`${this.region}Collapsed`, this.isCollapsed);
    this.get('layout').restylePanels();
    this.sendAction('config.actions.collapsePanel');
  },
  expand() {
    this.set('isCollapsed', false);
    this.get('layout').set(`${this.region}Collapsed`, this.isCollapsed);
    this.get('layout').restylePanels();
    this.sendAction('config.actions.expandPanel');
  },

  updateLayout(){
    let layout = this.get("layout");
    this.set("relStyle", Ember.String.htmlSafe(layout.styleFor(this.region)));
  },

  layout: Ember.computed(function() {
    return this.nearestOfType(Layout);
  }),

  init(){
    this._super(...arguments);
    let config = this.get("_config");
    let layout = this.get("layout");

    Ember.assert('config should be passed', config);
    Ember.assert('config.region should be passed', config.region);
    Ember.assert('must be inside {{#collapsible-layout}} block as layout', layout);

    this.set('config', config);
    this.set(config.region, true);
    this.set("region", config.region);
    this.set("resizeable", config.resizeable);

    layout.set(config.region, this);
  },

  didReceiveAttrs(){
    this._super(...arguments);

    let config = this.get("config");

    if(!this.get("sizeValue")){
      if(config.region === "top" || config.region === "bottom"){
        let height = config.height || 100;

        this.set("sizeValue", height);
        this.set("keySizeValue", "height");
      }
      else if(config.region === "left" || config.region === "right"){
        let width = config.width || 100;

        this.set("sizeValue", width);
        this.set("keySizeValue", "width");
      }
    }
  }

});

import Ember from 'ember';

export default Ember.Controller.extend({
  leftPanel: {
    region: 'left',
    hideCollpseBtn: true,
    width: 300
  },
  rightPanel: {
    region: 'right',
    width: 300
  },
  topPanel: {
    region: 'top',
    hideCollpseBtn: true,
    height: 50
  },
  centerPanel: {
    region: 'center'
  }
});

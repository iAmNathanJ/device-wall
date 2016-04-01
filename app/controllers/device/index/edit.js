import Ember from 'ember';

export default Ember.Controller.extend({
  device: Ember.computed(function() { return this.get('model'); }),
  slugify(str) {
    return str.toString().toLowerCase().trim()
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[\s\W-]+/g, '-')      // Replace spaces, non-word characters and dashes with a single dash (-)
      .replace(/-$/, '');             // Remove last floating dash if exists
  },
  actions: {
    editDevice(d) {
      var device = this.get('device');
      device.set('slug', this.slugify(device.get('name')));
      device.save();
      this.transitionToRoute('wall');
    },
    cancel() {
      this.set('name', '');
      this.set('url', '');
      this.transitionToRoute('wall');
    }
  }
});
export const createEvent = () => function() {

    var self = this;

    self.listeners = {};

    return {

        raise: function() {
            var listeners = self.listeners;

            if (typeof listeners === 'undefined') {
                return;
            }

            listeners.forEach((callback) => callback());
        },

        addListener: function(callback) {
            self.listeners.push(callback);
        }

    };
}();

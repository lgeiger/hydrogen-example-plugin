'use babel';

import { CompositeDisposable, Disposable } from 'atom';

const ExamplePlugin = {
  subscriptions: null,
  hydrogen: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-text-editor', {
        'example-plugin:connect-to-hydrogen': () => this.connectToHydrogen(),
      }),
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  consumeHydrogen(hydrogen) {
    this.hydrogen = hydrogen;
    return new Disposable(() => {
      this.hydrogen = null;
    });
  },

  connectToHydrogen() {
    if (this.hydrogen) {
      atom.notifications.addSuccess('Successfully connected to Hydrogen!');
      return;
    }
    atom.notifications.addError('Hydrogen `v1.0.0+` has to be running.');
  },
};

export default ExamplePlugin;

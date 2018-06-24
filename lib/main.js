"use babel";

import { CompositeDisposable, Disposable } from "atom";
import { kernelMiddlewareExample } from "./kernel-middleware";

const ExamplePlugin = {
  subscriptions: null,
  hydrogen: null,
  middlewareAttached: false,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add("atom-text-editor", {
        "example-plugin:connect-to-hydrogen": () => this.connectToHydrogen(),
        "example-plugin:attach-kernel-middleware": () => this.attachMiddleware()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
    this.hydrogen = null;
  },

  consumeHydrogen(hydrogen) {
    this.hydrogen = hydrogen;
    return new Disposable(() => {
      this.deactivate();
    });
  },

  connectToHydrogen() {
    if (this.hydrogen) {
      atom.notifications.addSuccess("Successfully connected to Hydrogen!");
      return;
    }
    atom.notifications.addError("Hydrogen `v1.0.0+` has to be running.");
  },

  attachMiddleware() {
    const kernel = this.hydrogen.getActiveKernel();

    if (!kernel) {
      return atom.notifications.addError(
        "You must have an active kernel in order to attach middleware."
      );
    }

    if (this.middlewareAttached) {
      atom.notifications.addInfo("You already added kernel middlware!");
      return;
    }

    kernel.addMiddleware(kernelMiddlewareExample);
    this.middlewareAttached = true;
    atom.notifications.addSuccess("Successfully added kernel middlware!");
  }
};

export default ExamplePlugin;

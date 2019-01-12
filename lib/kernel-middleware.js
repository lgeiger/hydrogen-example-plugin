"use babel";

export const kernelMiddlewareExample = {
  execute(next, code, onResults) {
    // It is possible to intercept code here before it is sent to the kernel
    // In this example we are just logging it then passing it along unchanged
    console.log("This is the code before the execution request: ", code);
    next.execute(code, (message, channel) => {
      // For information on jupyter messaging and channels:
      //  https://jupyter-client.readthedocs.io/en/stable/messaging.html#general-message-format

      // Display the execution count, as an example of something simple to do with a message
      if (message.header && message.header.msg_type === "execute_input") {
        console.log(`Your input count is: ${message.content.execution_count}`);
      }
      if (message.header.msg_type === "execute_result") {
        console.log(
          `Do some debugging with the execute result message!: `,
          message
        );
      // Probably useful:
      // message.content.data
      }

      // Continue the callback chain
      onResults(message, channel);
    });
  }
  // interupt, shutdown, restart, complete, and inspect can also be implemented
  // For more about kernel middleware, and helpful type definitions:
  // https://github.com/nteract/hydrogen/blob/master/lib/plugin-api/hydrogen-types.js
};

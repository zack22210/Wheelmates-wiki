import type {Instrumentation} from 'next';

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  const details = error instanceof Error
    ? {name: error.name, message: error.message, stack: error.stack?.slice(0, 6000)}
    : {value: String(error)};

  console.error(
    `[request-error] ${encodeURIComponent(JSON.stringify({
      path: request.path,
      routePath: context.routePath,
      renderSource: context.renderSource,
      ...details
    }))}`
  );
};


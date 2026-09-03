import type {Instrumentation} from 'next';

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  const details = error instanceof Error
    ? {name: error.name, message: error.message, stack: error.stack}
    : {value: String(error)};

  console.error('[prerender-request-error]', {
    path: request.path,
    routePath: context.routePath,
    renderSource: context.renderSource,
    ...details
  });
};

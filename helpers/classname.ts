export default (className: string, props: {className?: string}) => {
  return [props.className || '', className].map(className => className.trim()).filter(Boolean).join(' ');
};

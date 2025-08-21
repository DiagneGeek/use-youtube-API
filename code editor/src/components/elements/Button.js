import { onMount, useRef } from '../../lib/reactivity.js';

export const Button = (child, options = {}) => {
  const {
    id,
    onClick,
    submit,
    second,
    className = '',
    props = ''
  } = options;

  // Setup click listener on mount
  if (id && onClick) {
    onMount(() => {
      const el = useRef(`#${id}`);
      if (el) {
        el.addEventListener('click', onClick, { once: true }); // Optional: `once: true` to prevent duplicates
      }
    });
  }

  const baseClass = 'p-2 my-1 flex items-center justify-center rounded-md border-default text-bold border';
  const bgClass = second
    ? 'bg-second'
    : 'bg-third'

  return `
    <button
      ${submit ? 'type="submit"' : ''}
      class="${baseClass} ${bgClass} ${className}"
      ${props}
      ${id ? `id="${id}"` : ''}
    >
      ${child}
    </button>
    
    <style>
      .btn {
        transition: var(--transition-main);
        line-height: 1;
        vertical-align: middle;
      }
      .btn:hover {
        ${!second ? 'background: var(--color-primary);' : ''}
        scale: 0.95;
      }
    </style>
  `;
};

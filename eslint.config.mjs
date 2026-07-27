import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Last, so it can switch off rules that fight the formatter.
  prettier,
];

export default eslintConfig;

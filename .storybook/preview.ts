import type { Preview } from '@storybook/react';
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    globalTypes: {
        darkMode: {
            defaultValue: true,
        },
        className: {
            defaultValue: 'dark',
        },
    },
};

export default preview;

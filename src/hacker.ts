// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
export const prerender;
export const hacker: CustomThemeConfig = {
	name: 'hacker',
	properties: {
		'--theme-font-family-base': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,  monospace',
		'--theme-font-family-heading':
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': 'var(--color-primary-400)',
		'--theme-rounded-base': '0px',
		'--theme-rounded-container': '0px',
		'--theme-border-base': '4px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #73d216
		'--color-primary-50': '234 248 220', // #eaf8dc
		'--color-primary-100': '227 246 208', // #e3f6d0
		'--color-primary-200': '220 244 197', // #dcf4c5
		'--color-primary-300': '199 237 162', // #c7eda2
		'--color-primary-400': '157 224 92', // #9de05c
		'--color-primary-500': '115 210 22', // #73d216
		'--color-primary-600': '104 189 20', // #68bd14
		'--color-primary-700': '86 158 17', // #569e11
		'--color-primary-800': '69 126 13', // #457e0d
		'--color-primary-900': '56 103 11', // #38670b
		// secondary | #204a87
		'--color-secondary-50': '222 228 237', // #dee4ed
		'--color-secondary-100': '210 219 231', // #d2dbe7
		'--color-secondary-200': '199 210 225', // #c7d2e1
		'--color-secondary-300': '166 183 207', // #a6b7cf
		'--color-secondary-400': '99 128 171', // #6380ab
		'--color-secondary-500': '32 74 135', // #204a87
		'--color-secondary-600': '29 67 122', // #1d437a
		'--color-secondary-700': '24 56 101', // #183865
		'--color-secondary-800': '19 44 81', // #132c51
		'--color-secondary-900': '16 36 66', // #102442
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '159 219 246', // #9fdbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #D41976
		'--color-error-50': '249 221 234', // #f9ddea
		'--color-error-100': '246 209 228', // #f6d1e4
		'--color-error-200': '244 198 221', // #f4c6dd
		'--color-error-300': '238 163 200', // #eea3c8
		'--color-error-400': '225 94 159', // #e15e9f
		'--color-error-500': '212 25 118', // #D41976
		'--color-error-600': '191 23 106', // #bf176a
		'--color-error-700': '159 19 89', // #9f1359
		'--color-error-800': '127 15 71', // #7f0f47
		'--color-error-900': '104 12 58', // #680c3a
		// surface | #2e3436
		'--color-surface-50': '224 225 225', // #e0e1e1
		'--color-surface-100': '213 214 215', // #d5d6d7
		'--color-surface-200': '203 204 205', // #cbcccd
		'--color-surface-300': '171 174 175', // #abaeaf
		'--color-surface-400': '109 113 114', // #6d7172
		'--color-surface-500': '46 52 54', // #2e3436
		'--color-surface-600': '41 47 49', // #292f31
		'--color-surface-700': '35 39 41', // #232729
		'--color-surface-800': '28 31 32', // #1c1f20
		'--color-surface-900': '23 25 26' // #17191a
	}
};
